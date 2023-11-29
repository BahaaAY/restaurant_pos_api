const FrequentPurchasesItem = require('../models/purchases_item');

const Purchase = require('../models/purchase');
const PurchasedItem = require('../models/purchased_item');

const { Op } = require('sequelize');


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

exports.deletePurchase = async (req, res, next) => {
    const purchaseId = req.params.purchaseId;
    try {
        const purchase = await Purchase.findByPk(purchaseId);
        if (!purchase) {
            return res.status(404).json({ message: "Purchase not found" });
        }
        await purchase.destroy();
        res.status(200).json({ message: "Purchase deleted" });
    } catch (err) {
        console.log(err);
    }
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


//generating reports
//daily report
exports.getPurchasesReport = async (req,res,next) => 
{
    //Order -> Purchase
//OrderItem -> PurchasedItem
//Item -> PurchasesItem(FrequentItem)
    const type = req.params.type; //daily or monthly or yearly
    console.log("type: ", type);
    switch(type)
    {
        case "daily":
            const date = new Date(req.body.date);
            const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
            console.log("body date: ", req.body.date);
            console.log("date: ", date);
            try {
                const purchases = await Purchase.findAll({
                    where: {
                        purchase_date: {
                        [Op.between]: [startOfDay, endOfDay],
                      },
                    },
                    include: [
                      {
                        model: PurchasedItem,
                        include: [
                          {
                            model: FrequentPurchasesItem,
                          },
                        ],
                      },
                    ],
                  })
                const total = await Purchase.sum('purchase_total', {
                    where: {
                      purchase_date: {
                        [Op.between]: [startOfDay, endOfDay],
                      },
                    },
                  });
                res.status(200).json({ count: purchases.length, total: total, purchases: purchases });
            } catch (err) {
                console.log(err);
            }
            break;
        case "monthly":
            const monthIndex = req.body.month-1;
            const year = req.body.year;
            const startOfMonth = new Date(year, monthIndex, 1);
            const endOfMonth = new Date(year, monthIndex + 1, 1);
            console.log("start: ", startOfMonth);
            console.log("end: ", endOfMonth);
            try {
                const purchases = await Purchase.findAll({
                    where: {
                        purchase_date: {
                        [Op.between]: [startOfMonth, endOfMonth],
                      },
                    },
                    include: [
                      {
                        model: PurchasedItem,
                        include: [
                          {
                            model: FrequentPurchasesItem,
                          },
                        ],
                      },
                    ],
                  })
                const total = await Purchase.sum('purchase_total', {
                    where: {
                      purchase_date: {
                        [Op.between]: [startOfMonth, endOfMonth],
                      },
                    },
                  });
                  const days = [];
                //get the number of days in the month 28 or 29 or 30 or 31
                const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
                //loop through the days and get the total for each day
                for (let i = 1; i <= daysInMonth; i++) {
                    const startOfDay = new Date(year, monthIndex, i);
                    const endOfDay = new Date(year, monthIndex, i + 1);
                    var day_total = await Purchase.sum('purchase_total', {
                      where: {
                        purchase_date: {
                          [Op.between]: [startOfDay, endOfDay],
                        },
                      },
                    });
                    if(day_total == null){
                      day_total = 0;
                    }
                    days.push({date: (year+'-'+(monthIndex+1)+'-'+i), total: day_total });
                  }
                res.status(200).json({ count: purchases.length, total: total, purchases: purchases, days: days});
            } catch (err) {
                console.log(err);
                
              }
            break;

    }


}









