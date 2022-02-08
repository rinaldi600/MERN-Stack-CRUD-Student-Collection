const express = require("express");
const mhsModel = require("../controllers/mhsController");

const router = express.Router();

router.get("/", async (req, res, next) => {
    const getData = await mhsModel.getDataMhs();
    res.json(getData);
});

router.get("/:id", async (req, res, next) => {
    const getId = req.params.id;

    try {
        const getDetail = await mhsModel.getDetailMhs(getId);
        res.json(getDetail);
    } catch (e) {
        res.json({ error: "Data Not Found" });
    }

});

router.get("/search/:keyword", async (req, res, next) => {
    const getKeyword = req.params.keyword;

    try {
        const searchMhs = await mhsModel.searchMhs(getKeyword);
        res.json(searchMhs);
    } catch (e) {
        res.json({ error: e });
    }

});

router.delete("/delete/:id", async (req, res, next) => {
   const getId = req.params.id;

   try {
       const deleteMhs = await mhsModel.deleteMhs(getId);
       res.json({success : "Data Has Been Deleted"});
   } catch (e) {
       res.json({error : "Data Not Found"})
   }
});

router.post("/post", async (req, res, next) => {
    try {
        const postMhs = await mhsModel.insertMhs(req.body);
        res.json({success : "Data Has Been Posted"});
    } catch (e) {
        if (e.hasOwnProperty('code') && e.code === 11000) {
            res.json({error : 'NIM already exist'})
        } else {
            res.json({error : e})
        }
    }
});

router.put("/:id", async (req, res, next) => {
    const getId = req.params.id;
    try {
        await mhsModel.updateMhs(getId, req.body);
        res.json({ success: "Data Has Been Changed" });
    } catch (e) {
        res.json({ error: e });
    }
});

module.exports = router;