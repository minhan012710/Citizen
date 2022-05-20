const Province = require("../models/province");
const database = require("../models/database.json");

const addProvince = async (req, res, next) => {
    try{
        let province = new Province({
            code: req.body.code,
            name: req.body.name,
            districts: []
        });
        await province.save();
        res.json({ message: "Thêm thành công", success: true });
    }catch(e){
        if (e && e.code === 11000) {
            res.json({ message: "Tỉnh/tp đã tồn tại", success: false, error: e })
        } else {
            res.json({ message: "Thêm thất bại", success: false, error: e });
        }
    }
}

const addDistrict = async (req, res, next) => {
    try {
        let district = {
            code: req.body.searchId + req.body.code,
            name: req.body.name,
            wards: []
        };
        let hasExisted = await Province.findOne({ "districts.code": district.code });
        if(!hasExisted){
            await Province.updateOne({ code: req.body.searchId }, {
                $push: {
                    districts: district
                }
            });
            res.json({ message: "Thêm thành công", success: true });
        }else{
            res.json({ message: "Quận/Huyện đã tồn tại", success: false });
        }
    } catch (e) {
        res.json({ message: "Thêm thất bại", success: false, error: e });
    }
}

const addWard = async (req, res, next) => {
    try {
        let ward = {
            code: req.body.searchId + req.body.code,
            name: req.body.name,
            wards: []
        };
        let hasExisted = await Province.findOne({ "districts.wards.code": ward.code });
        if(!hasExisted){
            await Province.updateOne({ "districts.code": req.body.searchId }, {
                $push: {
                    "districts.$.wards": ward
                }
            })
            res.json({ message: "Thêm thành công", success: true });
        }else{
            res.json({ message: "Xã/Phường đã tồn tại", success: false });
        }
    } catch (e) {
        res.json({ message: "Thêm thất bại", success: false, error: e });
    }
}

const addResidential = async (req, res, next) => {
    try {
        let residential = {
            code: req.body.searchId + req.body.code,
            name: req.body.name,
            wards: []
        };
        let hasExisted = await Province.findOne({ "districts.wards.residentials.code": residential.code });
        if(!hasExisted){
            await Province.updateOne({ "districts.wards.code": req.body.searchId }, {
                $push: {
                    "districts.$[].wards.$[].residentials": residential
                }
            });
            res.json({ message: "Thêm thành công", success: true });
        }else{
            res.json({ message: "Địa bàn đã tồn tại", success: false });
        }
    } catch (e) {
        res.json({ message: "Thêm thất bại", success: false, error: e });
    }
}

const getProvince = async (req, res, next) => {
    try{
        let code = req.query.code;
        let provinces = await Province.find({ code: { $regex: code || "", $options: "i" } });
        res.json({ message: "Lấy data thành công", success: true, provinces: provinces })
    }catch(e){
        res.json({ message: "Lấy data thất bại", success: false, error: e });
    }
}

const getDistrict = async (req, res, next) => {
    try {
        let province = await Province.findOne({ code: req.query.code });
        res.json({ message: "Lấy data thành công", success: true, districts: province })
    } catch (e) {
        res.json({ message: "Lấy data thất bại", success: false, error: e });
    }
}

const getWard = async (req, res, next) => {
    try {
        let wards = await Province.aggregate([
            {
                $unwind: "$districts"
            }, {
                $match: {
                    "districts.code": req.query.code
                }
            }
        ])
        res.json({ message: "Lấy data thành công", success: true, wards: wards[0] || null })
    } catch (e) {
        res.json({ message: "Lấy data thất bại", success: false, error: e });
    }
}

const getResitential = async (req, res, next) => {
    try {
        let residentials = await Province.aggregate([
            {
                $unwind: "$districts"
            }, {
                $unwind: "$districts.wards"
            }, {
                $match: {
                    "districts.wards.code": req.query.code
                }
            }
        ])
        res.json({ message: "Lấy data thành công", success: true, residentials: residentials[0] || null })
    } catch (e) {
        res.json({ message: "Lấy data thất bại", success: false, error: e });
    }
}

const updateNameProvince = async (req, res, next) =>{
    const provinces = req.params.province;
    const value = req.body.name;
    Province.findOneAndUpdate({id:provinces,name:value}).then(
        res.status(200).send({message:"Update success!"})
    ).catch(err)(
        res.status(err.status || 400).send({message:err})
    )
}

const deleteProvince = async (req, res, next) =>{
    const province = req.params.province;
    Province.findOneAndDelete({id:province}).then(
        res.status(200).send({message:"Delete success!"})
    ).catch(err)(
        res.status(err.status || 400).send({message:err})
    )
}

const getAll = async (req, res, next) =>{
    
    try{
        const province = await Province.find();
        res.status(200).send(province)
    }catch(err){
        res.status(err.status || 401).send({message:err})
    }
}



module.exports = {
    getProvince,
    getDistrict,
    getWard,
    getResitential,
    addProvince,
    addWard,
    addDistrict,
    addResidential,
    updateNameProvince,
    deleteProvince,
    getAll
}