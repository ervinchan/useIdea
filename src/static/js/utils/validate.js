class Validate {
    static checkEmail(str) {
        var reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
        if (reg.test(str)) {
            return true;
        }
        return false;
    }
}

export default Validate