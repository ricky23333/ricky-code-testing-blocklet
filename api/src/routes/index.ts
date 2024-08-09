import middleware from '@blocklet/sdk/lib/middlewares';
import { Router } from 'express';
import { Sequelize, Model, DataTypes } from 'Sequelize';
import { body, validationResult } from 'express-validator';

// Create Sequelize instance
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

// Define Profile model
class Profile extends Model {}
Profile.init(
  {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
  },
  { sequelize, modelName: 'profile' },
);

// Sync models with database
sequelize.sync();

const router = Router();

router.use('/user', middleware.user(), (req, res) => res.json(req.user || {}));

router.use('/data', (_, res) =>
  res.json({
    message: 'Hello Blocklet!',
  }),
);

// CRUD routes for Profile model
router.get('/profile/:id', async (req, res) => {
  const profile = await Profile.findByPk(req.params.id);
  if (profile) {
    res.json(profile);
  } else {
    const newProfile = await Profile.create({ name: 'Ricky', email: 'rickyluo0923@gmail.com', phone: '18408267071' });
    res.json(newProfile);
  }
});

router.post('/profile', async (req, res) => {
  const profile = await Profile.upsert(req.body);
  // const profile = await Profile.create(req.body);
  res.json(profile);
});

const isValidChineseMobile = (value: string) => {
  const mobileRegex = /^1[3-9]\d{9}$/;
  return mobileRegex.test(value);
};

router.put(
  '/profile/:id',
  [
    body('name').isLength({ max: 10 }).withMessage('Name must be less than 10 characters long'),
    // validate email format
    body('email')
      .isEmail()
      .withMessage('Please provide a valid email address')
      .isLength({ max: 50 })
      .withMessage('Email must be less than 50 characters long'),
    body('phone').custom(isValidChineseMobile).withMessage('Please provide a valid Chinese mobile number'),
  ],
  async (req: any, res: any) => {
    // get validate result
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // return validate error message
      return res.status(400).json({ errors: errors.array() });
    }

    const profile = await Profile.findByPk(req.params.id);
    if (profile) {
      await profile.update(req.body);
      res.json(profile);
    } else {
      res.status(404).json({ message: 'Profile not found' });
    }
    return {};
  },
);

router.delete('/profile/:id', async (req, res) => {
  const profile = await Profile.findByPk(req.params.id);
  if (profile) {
    await profile.destroy();
    res.json({ message: 'Profile deleted' });
  } else {
    res.status(404).json({ message: 'Profile not found' });
  }
});

export default router;
