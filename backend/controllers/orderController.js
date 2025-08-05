import Order from "../models/Order.js";
import Product from "../models/Product.js";

// Place order with COD: /api/order/cod
export const placeOrderCOD = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const { items, address } = req.body;

    if (!address || items.length === 0) {
      return res.json({ success: false, message: "Invalid data" });
    }

    const productIds = items.map(item => item.product);
    const products = await Product.find({ _id: { $in: productIds } });

    const productById = {};
    products.forEach(p => {
      productById[p._id.toString()] = p;
    });

    let amount = 0;
    for (const item of items) {
      const prod = productById[item.product];
      if (prod) {
        amount += prod.offerPrice * item.quantity;
      } else {
        return res.json({ success: false, message: `Product ${item.product} not found` });
      }
    }

    amount += Math.floor(amount * 0.02); // 2% tax

    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
    });

    return res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

// ✅ Get Orders by Logged-in User: /api/order/user
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const { paymentType } = req.query;

    let filter = { userId };

    if (paymentType) {
      filter.paymentType = paymentType;
    } else {
      filter.$or = [{ paymentType: "COD" }, { isPaid: true }];
    }

    const orders = await Order.find(filter)
      .populate("items.product address")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get All Orders for Seller/Admin: /api/order/seller
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Delete Order by ID
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Order.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    console.log("Order delete error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Place Online Order: /api/order/online
export const placeOrderOnline = async (req, res) => {
  try {
    const { items, address, transactionId } = req.body;

    if (!items || !address || !transactionId) {
      return res.json({ success: false, message: "Missing data" });
    }

    const productIds = items.map(item => item.product);
    const products = await Product.find({ _id: { $in: productIds } });

    let amount = 0;
    for (const item of items) {
      const prod = products.find(p => p._id.toString() === item.product);
      if (prod) {
        amount += prod.offerPrice * item.quantity;
      } else {
        return res.json({ success: false, message: "Product not found" });
      }
    }

    amount += Math.floor(amount * 0.02);

    const order = await Order.create({
      userId: req.user._id,
      items,
      address,
      paymentType: "Online",
      isPaid: true,
      transactionId,
      amount,
    });

    res.json({ success: true, message: "Order placed", order });
  } catch (err) {
    console.error("placeOrderOnline error:", err);
    res.json({ success: false, message: err.message });
  }
};
