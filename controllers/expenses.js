const FrequentPurchasesItem = require('../models/purchases_item');

const Purchase = require('../models/purchase');
const PurchasedItem = require('../models/purchased_item');
exports.getFrequentPurchases = (req, res, next) => {
    FrequentPurchasesItem.findAll()
        .then((frequentPurchases) => {
            res.status(200).json({ frequentPurchases: frequentPurchases });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.postPurchase = async (req, res, next) => {

    const itemName = req.body.item_name;
    const itemPrice = req.body.item_price;
    const itemQuantity = req.body.item_quantity;
    const purchaseTotal = req.body.total;

    //create FrequentPurchasesItem if not exists

    const freqItem = await FrequentPurchasesItem.findOne({
            where: {
                item_name: itemName,
            }
    }
        );

    if(freqItem)
    {

        freqItem.item_price = itemPrice;
        await freqItem.save();
        //dont save to frequent purchases
        //just update price and add to purchases

        //create a purchase
        const newPurchase = await Purchase.create({
            purchase_date: Date.now(),
            purchase_total: purchaseTotal
        });

        //add Item to purchase
        const purchasedItem = await PurchasedItem.create({
            frequentPurchasesItemId: freqItem.id,
            purchaseId: newPurchase.id,
            quantity: itemQuantity,
            price: itemPrice
        });
       

    }else
    {
        //add to frequent purchases
        const newFreqItem = await FrequentPurchasesItem.create({
            item_name: itemName,
            item_price: itemPrice
        });
        //create a purchase
        const newPurchase = await Purchase.create({
            purchase_date: Date.now(),
            purchase_total: purchaseTotal
        });

        //add Item to purchase
        const purchasedItem = await PurchasedItem.create({
            frequentPurchasesItemId: newFreqItem.id,
            purchaseId: newPurchase.id,
            quantity: itemQuantity,
            price: itemPrice
        });




    }
    res.status(200).json({ message: "Purchase saved" });

};

exports.deleteFrequentPurchase = async (req, res, next) => {
    const freqId = req.params.freqId;
    try {
        const freqItem = await FrequentPurchasesItem.findByPk(freqId);
        if (!freqItem) {
            return res.status(404).json({ message: "Item not found" });
        }
        await freqItem.destroy();
        res.status(200).json({ message: "Item deleted" });
    } catch (err) {
        console.log(err);
    }
};





