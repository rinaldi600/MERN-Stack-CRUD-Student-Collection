const mhsModel = require("../models/mhsModel");

const getDataMhs = async () => {
    const getData = await mhsModel.find({});
    return getData;
};

const searchMhs = async (keyword) => {
    const getDataMhs = await mhsModel.find({nama : {$regex: keyword, $options : 'i'}});
    return getDataMhs;
};

const getDetailMhs = async (id) => {
  const getDetail = await mhsModel.findOne({_id : id});
  return getDetail;
};

const deleteMhs = async (id) => {
    const deleteMhs = await mhsModel.deleteOne({_id : id});
    return deleteMhs;
};

const insertMhs = async (data) => {
    const insertMhs = await mhsModel.create(data);
    return insertMhs;
};

const updateMhs = async (id, data) => {
    const changeDataMhs = await mhsModel.findOneAndUpdate({_id : id}, data);
    return changeDataMhs;
};

module.exports = {
    getDataMhs,
    getDetailMhs,
    deleteMhs,
    insertMhs,
    updateMhs,
    searchMhs
};

