const Admin = require("../models/admin")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const updateWorkSession = async (req, res, next) => {
    try{
        if(req.body.isLockedOut){
            await Admin.updateMany(
                {
                    username: {
                        $regex: `^${req.body.code}`,
                        $options: "m"
                    }
                }, {
                    sessionStart: req.body.sessionStart,
                    sessionEnd: req.body.sessionEnd,
                    isLockedOut: req.body.isLockedOut
                }
            );
            res.json({ message: "Thu hồi quyền thành công", success: true });
        }else{
            await Admin.updateOne({ username: req.body.code }, {
                sessionStart: req.body.sessionStart,
                sessionEnd: req.body.sessionEnd,
                isLockedOut: req.body.isLockedOut,
            });
            res.json({ message: "Cấp quyền thành công", success: true });
        }
    }catch(e){
        res.json({ message: "Có lỗi xảy ra, hãy thử lại sau", success: false })
    }
}

const CreateAccount = async (req, res) => {
    try {
        const data = req.body;
        let admin = new Admin({
            username: data.username,
            fullname: data.fullname,
            birthday: data.birthday,
            gender: data.gender,
            role: data.role,
            superior: data.superior,
            password: bcrypt.hashSync(data.password, 10),
            isLockedOut: false
        });
        await admin.save();
        res.json({ message: "Tạo tài khoản thành công", success: true })
    } catch (e) {
        if (e && e.code === 11000) {
            res.json({ message: "Tài khoản đã tồn tại", success: false, error: e });
        } else {
            res.json({ message: "Tạo tài khoản thất bại", success: false, error: e });
        }
    }
}


const loginUser = async (req, res) => {
    const loginInfo = req.body;
    const user = await Admin.findOne({ username: loginInfo.username });
    if (user && bcrypt.compareSync(loginInfo.password, user.password)) {
        const payload = {
            profile: user
        }
        const secretKey = process.env.secrectkey;
        const token = jwt.sign(
            payload,
            secretKey, {
            expiresIn: 365 * 24 * 60 * 60,
        }
        )
        res.status(200).send({ token: token, profile: user });
    } else {
        res.json({ message: "Sai tên tài khoản hoặc mật khẩu", success: false })
    }
}

const searchSubordinates = async (req, res, next) => {
    let page = req.body.page || 1;
    let numshow = req.body.numshow || 10;
    await Admin.aggregate([
        {
            $match: {
                username: { $regex: `^${req.body.code}` },
                role: req.body.role
            }
        }, {
            $skip: (page - 1) * numshow
        }, {
            $limit: numshow
        }, {
            $addFields: {
                sessionStart: {
                    $dateToString: {
                        format: "%d/%m/%Y",
                        date: "$sessionStart"
                    }
                },
                sessionEnd: {
                    $dateToString: {
                        format: "%d/%m/%Y",
                        date: "$sessionEnd"
                    }
                }
            }
        }
    ]).exec((err, subordinates) => {
        Admin.countDocuments((err2, count) => {
            if(!err & !err2){
                res.json({
                    page: page,
                    totalPage: Math.ceil(count / numshow),
                    data: subordinates || []
                });
            }else{
                res.json({ message: "Có lỗi xảy ra, hãy thử lại sau", success: false })
            }
        });
    });
}

const updateActive = async (req, res) => {


    const idAdmin = req.params.idAdmin
    const user = await Admin.findOne({
        id: idAdmin
    });

    const status = user.isActive;
    const udpateStatus = !status;
    Admin.findOneAndUpdate({
        manager: idAdmin,
        isLockedOut: udpateStatus,
    }).then(
        (result) => {
            return res.status(200).send({ message: "Update success" })
        }

    ).catch(
        (err) => {
            res.status(err.status || 400).send({ message: err })
        }
    )
}



module.exports = {
    loginUser,
    CreateAccount,
    searchSubordinates,
    updateActive,
    updateWorkSession
}