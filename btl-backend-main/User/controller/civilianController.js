const Civilian = require("../models/civilian");
const admin = require("../../A/models/admin");

const informCivilian = async(req, res, next) => {
    try {
        let civilianInfo = req.body.civilianInfo;
        const civilian = new Civilian({
            citizenId: civilianInfo.citizenId,
            fullname: civilianInfo.fullname,
            birthday: civilianInfo.birthday,
            gender: civilianInfo.gender,
            origin: civilianInfo.origin,
            permanentAddress: civilianInfo.permanentAddress,
            temporaryAddress: civilianInfo.temporaryAddress,
            religion: civilianInfo.religion,
            educationLevel: civilianInfo.educationLevel,
            career: civilianInfo.career,
            reporter: civilianInfo.reporter,
        });
        await civilian.save();
        res.status(200).json({ message: "Khai báo thành công", success: true })
    } catch {
        (e) => {
            console.log(e)
            if (e && e.code === 11000) {

                res.status(e.status || 400).json({ message: "Công dân đã tồn tại", success: false, error: e })
            }
        }
    }
}

const reinformCivilian = async(req, res, next) => {
    try {
        let civilian = req.body.civilian;
        await Civilian.updateOne({ citizenId: civilian.citizenId }, {
            fullname: civilian.fullname,
            birthday: civilian.birthday,
            gender: civilian.gender,
            origin: civilian.origin,
            permanentAddress: civilian.permanentAddress,
            temporaryAddress: civilian.temporaryAddress,
            religion: civilian.religion,
            educationLevel: civilian.educationLevel,
            career: civilian.career,
        })
        res.json({ message: "Sửa khai báo thành công", success: true })
    } catch (e) {
        res.json({ message: "Sửa khai báo thất bại", success: false, error: e })
    }
}

const deleteCivilian = async(req, res, next) => {
    try {
        await Civilian.deleteOne({ citizenId: req.body.citizenId })
        res.json({ message: "Xóa khai báo thành công", success: true })
    } catch (e) {
        res.json({ message: "Xóa khai báo thất bại", success: false, error: e })
    }
}

const searchCivilian = async(req, res) => {
    let searchQuery = req.body.searchQuery;
    let numshow = req.body.numshow || 15;
    let page = req.body.page || 1;
    await Civilian.aggregate([{
        $match: {
            reporter: searchQuery.code
        }
    }, {
        $addFields: {
            combined: {
                $concat: [
                    "$citizenId",
                    " ",
                    "$fullname",
                    " ",
                    {
                        $dateToString: {
                            format: "%d/%m/%Y",
                            date: "$birthday"
                        }
                    },
                    " ",
                    "$permanentAddress",
                    " ",
                    "$temporaryAddress",
                ]
            }
        }
    }, {
        $skip: (page - 1) * numshow
    }, {
        $limit: numshow
    }, {
        $addFields: {
            birthday: {
                $dateToString: {
                    format: "%d/%m/%Y",
                    date: "$birthday"
                }
            }
        }
    }]).exec((err, civilians) => {
        Civilian.countDocuments({ reporter: searchQuery.code }, (err2, count) => {
            let newCivilians = civilians.filter((c) => {
                let shouldReturn = true;
                if (!c.combined.toLowerCase().includes(searchQuery.any.toLowerCase())) {
                    shouldReturn = false;
                }
                return shouldReturn
            })
            if (!err && !err2) {
                res.json({
                    page: page,
                    totalPage: Math.ceil(count / numshow),
                    data: newCivilians || []
                })
            } else {
                res.json({ message: "Có lỗi xảy ra, hãy thử lại sau", success: false })
            }
        })
    })
}

const getCivilianById = async(req, res, next) => {
    try {
        const civilian = await Civilian.findOne({ citizenId: req.body.citizenId });
        res.json({ message: "Lấy data thành công", success: true, civilian: civilian });
    } catch (e) {
        res.json({ message: "Có lỗi xảy ra, hãy thử lại sau", success: false, error: e });
    }
}

const statisticalUser = async(req, res) => {
    const day = new Date();
    const years = Number(day.getFullYear());
    const fullDino = 10000;
    try {
        const amountUser = await Civilian.countDocuments();
        const amoutMale = await Civilian.countDocuments({ sex: "Male" });
        const yearNow = await Civilian.countDocuments({ years: years }) // amount people new

        const amoutFemale = amountUser - amoutMale; // female
        const averge = amountUser / 331690 // 

        const growth = 16;
        const male = (amoutMale / amountUser) * 100;
        const female = 100 - amoutMale;


        const data = {
            peopleNew: yearNow,
            growth: growth,
            averge: averge,
            amountUser: amountUser,
            male: male,
            female: female
        }
        res.status(200).send(data);




    } catch {
        (err) => {
            res.status(err.status).send({ message: err });
        }

    }
}





module.exports = {
    statisticalUser,
    informCivilian,
    searchCivilian,
    getCivilianById,
    reinformCivilian,
    deleteCivilian
}