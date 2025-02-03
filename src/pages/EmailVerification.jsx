import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";

const EmailVerification = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            axios.get(`https://booksstore-app-server.onrender.com/user/verify?token=${token}`)
                .then(() => {
                    enqueueSnackbar("Email verified successfully! You can now log in.", { variant: "success" });
                    navigate("/");
                })
                .catch(() => {
                    enqueueSnackbar("Invalid or expired token", { variant: "error" });
                });
        }
    }, [token, enqueueSnackbar, navigate]);

    return (
        <div className="p-4">
            <h1>Email Verification</h1>
            <p>Verifying your email, please wait...</p>
        </div>
    );
};

export default EmailVerification;
