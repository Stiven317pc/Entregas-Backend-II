import { Router } from 'express';
import bcrypt from 'bcrypt';
import { UserModel } from '../dao/models/userModel.js';
import { cartDBManager } from '../dao/cartDBManager.js';

const router = Router();
const CartService = new cartDBManager();

router.get('/', async (req, res) => {
  try {
    const users = await UserModel.find().select('-password');
    res.json({ status: 'success', payload: users });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

router.get('/:uid', async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.uid).select('-password').populate('cart');
    if (!user) return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
    res.json({ status: 'success', payload: user });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { first_name, last_name, email, age, password, role } = req.body;

    const exists = await UserModel.findOne({ email });
    if (exists) return res.status(400).json({ status: 'error', message: 'Email ya registrado' });

    const newCart = await CartService.createCart();
    const cartId = newCart._id;

    const hashed = bcrypt.hashSync(password, 10);

    const user = await UserModel.create({
      first_name, last_name, email, age,
      password: hashed, cart: cartId, role
    });

    const { password: pw, ...userData } = user.toObject();
    res.status(201).json({ status: 'success', payload: userData });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

router.put('/:uid', async (req, res) => {
  try {
    const updates = { ...req.body };
    if (updates.password) {
      updates.password = bcrypt.hashSync(updates.password, 10);
    }
    const user = await UserModel.findByIdAndUpdate(req.params.uid, updates, { new: true }).select('-password');
    if (!user) return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
    res.json({ status: 'success', payload: user });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
});

router.delete('/:uid', async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.uid).select('-password');
    if (!user) return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
    res.json({ status: 'success', payload: user });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
});

export default router;
