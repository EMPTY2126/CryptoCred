import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const authenticator = () => {
    const token = Cookies.get('tokenn');
    if (!token) return false;

    const user = jwtDecode(token);  // Decode token
    if (Date.now() >= user.exp * 1000) {
        Cookies.remove('tokenn');  // Remove expired token
        return false;
    }
    const newUser = {userName:user.user.userName, userEmail:user.user.userEmail, userImage:user.user.userImage, loanAmount : user.user.loanAmount}
    const balance = user.user.balance;
    return {
        flag: true,
        userId: newUser,
        balance:balance
    };
}

export default authenticator;
