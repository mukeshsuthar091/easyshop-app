exports.postRegister = async (req, res, next) => {
    try {
        const { error } = registerSchema.validate(req.body);
        if (error) {
            return sendHttpResponse(
                req,
                res,
                next,
                generateResponse({
                    status: "error",
                    statusCode: 400,
                    msg: error.details[0].message,
                })
            );
        }
        const { role, phoneno, country_code } = req.body;

        if (parseInt(role) !== 1 && parseInt(role) !== 2) {
            return sendHttpResponse(
                req,
                res,
                next,
                generateResponse({
                    status: "error",
                    statusCode: 400,
                    msg: "Invalid role❌",
                })
            );
        }

        if (parseInt(role) == 2 && !req.files["image"]) {
            return sendHttpResponse(
                req,
                res,
                next,
                generateResponse({
                    status: "error",
                    statusCode: 404,
                    msg: "For businesses,business logo is required",
                })
            );
        }

        let [userResults] = await getUserDataByPhoneNo(phoneno);

        if (userResults.length > 0) {
            return sendHttpResponse(
                req,
                res,
                next,
                generateResponse({
                    statusCode: 400,
                    status: "error",
                    msg: "User already exists👀",
                })
            );
        }

        let imageUrl, aadharphoto;
        if (req.files && req.files["image"]) {
            imageUrl = req.files["image"][0].path;
        } else {
            imageUrl = null;
        }

        if (role == 2 && !req.files["aadharphoto"]) {
            return sendHttpResponse(
                req,
                res,
                next,
                generateResponse({
                    status: "error",
                    statusCode: 400,
                    msg: "Addhar photo for business is required",
                })
            );
        } else if (role == 2 && req.files["aadharphoto"][0]) {
            aadharphoto = req.files["aadharphoto"][0].path;
        }

        const phonewithcountrycode = country_code + phoneno;
        // const hashedPassword = await bcrypt.hash(password, 8);
        const response = await otpless.sendOTP(
            phonewithcountrycode,
            "",
            "SMS",
            "",
            "",
            600,
            4,
            clientId,
            clientSecret
        );
        if (response.success === false) {
            return sendHttpResponse(
                req,
                res,
                next,
                generateResponse({
                    statusCode: 400,
                    status: "error",
                    msg: "Failed to generate OTP❌",
                })
            );
        } else {
            return sendHttpResponse(
                req,
                res,
                next,
                generateResponse({
                    statusCode: 201,
                    status: "success",
                    msg: "Otp sent successfully on given mobile number🚀",
                    data: {
                        // role: role,
                        // firstname: firstname,
                        // lastname: lastname,
                        // email: email,
                        // password: hashedPassword,
                        // image: imageUrl,
                        // b_name: b_name,
                        // category: category,
                        // subcategory: subcategory,
                        // city: city,
                        // state: state,
                        // address: address,
                        // aadharphoto: aadharphoto,
                        // aadharno: aadharno,
                        // country_code,
                        // phoneno: phoneno,
                        otpid: response.orderId,
                        // otpid: 'Otp_1A92DDDBBD014A5680909AE2CB2B4C72',
                    },
                })
            );
        }
    } catch (error) {
        console.log("error while registering user", error);
        return sendHttpResponse(
            req,
            res,
            next,
            generateResponse({
                status: "error",
                statusCode: 500,
                msg: "internal server error",
            })
        );
    }
};
