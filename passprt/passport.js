var freshpassport = 0;
var reissuepassport = 0;
var existingpersonal = 0;
var textfieldflag = 0;
var section6flag = 0;
var everappliedflag = 0;
var employmentflag = 0;
var sameaddressflag = 0;
var special_regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
var special_number_regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?1234567890]+/;
var address_regex = /[!@#$%^&*()_+\=\[\]{};':"\\|.<>\?]+/;
var email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var file_regex = /(\.jpg|\.jpeg|\.pdf|\.png)$/i;
var today = new Date();


function checkCheckboxCheked(elem) {
    var textfield = document.getElementById("comment");
    if (elem.checked == true) {
        textfield.disabled = false;
        textfieldflag = 1;
    } else {
        textfield.disabled = true;
        textfieldflag = 0;
        textfield.value = "";
    }
}

function isAlphaNumeric(elem) {
    var isValid = false;
    var regex = /^[a-zA-Z0-9]*$/;
    isValid = regex.test(elem);
    return isValid;
}

function isNumeric(elem) {
    var isValid = false;
    var regex = /^[0-9]*$/;
    isValid = regex.test(elem);
    return isValid;
}

function isMinLimitTrue(elem, minLimit) {
    if (elem.length > minLimit) {
        return false;
    }
}

function isMaxLimitTrue(elem, maxLimit) {
    if (elem.length < maxLimit) {
        return false;
    }
}

function isCountry() {
    selectcountry = document.querySelector('input[name=selectcountry]:checked')
    var birthcity = document.getElementById("birthcity")
    var txtdistrict = document.getElementById("txtdistrict")
    var txtstate = document.getElementById("txtstate")
    var country = document.getElementById('country')
    if (selectcountry.value == 1) {
        birthcity.disabled = false
        txtdistrict.disabled = false
        txtstate.disabled = false
        country.disabled = true
    } else if (selectcountry.value == 2) {
        birthcity.disabled = true
        txtdistrict.disabled = true
        txtstate.disabled = true
        country.disabled = false
    }
}

function isEmploymentOf() {
    employment = document.querySelector('input[name=employment]:checked').value
    if (employment == 1 || employment == 2 || employment == 3) {
        document.getElementById('employed').disabled = false;
        document.getElementById('employed').focus();
        employmentflag = 1;
    } else {
        document.getElementById('employed').disabled = true;
        employmentflag = 0;
    }
}


function sameaddress(ele) {
    if (ele.value == 1 && ele.checked == true) {
        document.getElementById('emergencycontactname').disabled = true;
        document.getElementById('emergencyaddress').disabled = true;
        document.getElementById('emergencyemail').disabled = true;
        sameaddressflag = 0;
    } else {
        document.getElementById('emergencycontactname').disabled = false;
        document.getElementById('emergencyaddress').disabled = false;
        document.getElementById('emergencyemail').disabled = false;
        sameaddressflag = 1;
    }
}

function everAppliedRadioButton(elem) {
    if (elem.checked == true && elem.value == 1) {
        document.getElementById('everappliedfilenumber').disabled = false;
        document.getElementById('applyingmonth').disabled = false;
        document.getElementById('appliedoffice').disabled = false;
        everappliedflag = 1;
    } else {
        document.getElementById('everappliedfilenumber').disabled = true;
        document.getElementById('applyingmonth').disabled = true;
        document.getElementById('appliedoffice').disabled = true;
        everappliedflag = 0;
    }
}

function validation() {
    var issueRadioboxes = document.getElementsByName("issue");
    var isFreshPassChecked = document.getElementById("freshpass").checked;
    var isRePassChecked = document.getElementById("repass").checked;
    var changeCheckboxes = document.getElementsByName("change");
    var section6 = document.getElementById('section6').getElementsByTagName('input');
    // var everapplied = document.getElementsByName('everapplied');
    var everappliedyes = document.getElementById('everappliedyes');
    var everappliedno = document.getElementById('everappliedno');


    for (i = 0; i < issueRadioboxes.length; i++) {
        if (isFreshPassChecked == true) {
            issueRadioboxes[i].checked = false;
            issueRadioboxes[i].disabled = true;
            freshpassport = 1;
            reissuepassport = 0;
            section6flag = 0;

            for (var j = 0; j < section6.length; j++) {
                section6[j].disabled = true;
            }

            everappliedyes.disabled = true;
            everappliedno.disabled = true;

        }
        if (isRePassChecked == true) {
            issueRadioboxes[i].disabled = false;
            freshpassport = 0;
            reissuepassport = 1;
            section6flag = 1;
            for (var j = 0; j < section6.length; j++) {
                section6[j].disabled = false;
            }
            everappliedyes.disabled = false;
            everappliedno.disabled = false;
        }
    }
    for (i = 0; i < changeCheckboxes.length; i++) {
        // changeCheckboxes[i].checked = false;
        if (isFreshPassChecked == true) {
            changeCheckboxes[i].disabled = true;
            existingpersonal = 0;
        }
        if (issueRadioboxes[2].checked == true) {
            changeCheckboxes[i].disabled = false;
            existingpersonal = 1;
        }
        if (issueRadioboxes[2].checked == false) {
            changeCheckboxes[i].disabled = true;
            existingpersonal = 0;
        }
    }

    var flag = 0;

    var last2 = new Date().getFullYear().toString().slice(-2);
    var filenumber = document.getElementById('filenumber').value;
    if (filenumber == "") {
        document.getElementById('filenumbererr').innerHTML = "<a href='#filenumber' style='color:red'>Please enter filenumber </a><br/>";
        flag = 1;
    } else {
        if (isAlphaNumeric(filenumber) == false) {
            document.getElementById('filenumbererr').innerHTML = "<a href='#filenumber' style='color:red'>Filenumber should be alphanumeric must not contain any special characters</a><br/>";
            flag = 1;
        } else if (isMinLimitTrue(filenumber, 12) == false) {
            document.getElementById('filenumbererr').innerHTML = "<a href='#filenumber' style='color:red'>Filenumber should be of maximum 12 character </a><br/>";
            // alert("Filenumber should be of maximum 12 character");
            flag = 1;
        } else if (isMaxLimitTrue(filenumber, 12) == false) {
            document.getElementById('filenumbererr').innerHTML = "<a href='#filenumber' style='color:red'>Filenumber should be of minimum 12 character </a><br/>";
            // alert("Filenumber should be of minimum 12 character");
            flag = 1;
        } else if (special_number_regex.test(filenumber[2])) {
            document.getElementById('filenumbererr').innerHTML = "<a href='#filenumber' style='color:red'>File number should start with Alphabet </a><br/>";
            flag = 1;
        } else if (filenumber.slice(10, 12) != last2) {
            document.getElementById("filenumbererr").innerHTML = " <a href='#filenumber' style='color:red'>File number Should End with last two digits of this year</a><br>";
        } else {
            document.getElementById('filenumbererr').innerHTML = "";
        }
    }

    var profile = document.getElementById('profile').value;
    if (profile == "") {
        document.getElementById('profileerr').innerHTML = "<a href='#lblprofile' style='color:red'>Please Upload Your recent colour photograph with white background of size 4.5cm X 3.5cm</a><br/>";
        flag = 1;
    } else if (!file_regex.exec(profile)) {
        document.getElementById('profileerr').innerHTML = "<a href='#lblprofile' style='color:red'>Choose photograph in .png/.jpg/.jpeg/.pdf type of format file only</a><br/>";
        flag = 1;
    } else {
        document.getElementById('profileerr').innerHTML = "";
    }

    var signature = document.getElementById('signature').value;
    if (signature == "") {
        document.getElementById('signatureerr').innerHTML = "<a href='#lblsignature' style='color:red'>Please Upload Your Signature</a><br/>";
        flag = 1;
    } else if (!file_regex.exec(signature)) {
        document.getElementById('signatureerr').innerHTML = "<a href='#lblsignature' style='color:red'>Choose Signature in .png/.jpg/.jpeg/.pdf type of format file only</a><br/>";
        flag = 1;
    } else {
        document.getElementById('signatureerr').innerHTML = "";
    }



    if (document.querySelectorAll('input[type="radio"][name="apply"]:checked').length == 0) {
        document.getElementById('freshpasserr').innerHTML = "<a href='#freshpass' style='color:red'>1.1 Please Select Applying for</a><br/>";
        flag = 1;
        // window.location = "freshpass";
        // alert("Please check applicant");
    } else {
        document.getElementById('freshpasserr').innerHTML = "";
    }

    if (reissuepassport == 1) {
        if (document.querySelectorAll('input[type="radio"][name="issue"]:checked').length == 0) {
            document.getElementById('issueerr').innerHTML = "<a href='#inp-1' style='color:red'>1.2 Please Select Appropriate Option from If re-issue, specify reason(s)</a><br/>";
            flag = 1;
        } else {
            document.getElementById('issueerr').innerHTML = "";
        }

        if (existingpersonal == 1) {
            if (document.querySelectorAll('input[type="checkbox"][name="change"]:checked').length == 0) {
                document.getElementById('changeerr').innerHTML = "<a href='#change-1' style='color:red'>1.3 Please Select If change in existing personal particulars, specify reason(s)</a><br/>";
                flag = 1;
            } else {
                if (textfieldflag == 1) {
                    var comment = document.getElementById('comment').value;
                    if (comment == "") {
                        document.getElementById('changeerr').innerHTML = "<a href='#comment' style='color:red'>1.3 Please specify reason</a><br/>";
                        flag = 1;
                    } else if (special_number_regex.test(comment)) {
                        document.getElementById('changeerr').innerHTML = "<a href='#comment' style='color:red'>1.3 In Reason Field Number & Special character are not allowed </a><br/>";
                        flag = 1;
                    } else {
                        document.getElementById('changeerr').innerHTML = "";
                    }
                } else {
                    document.getElementById('changeerr').innerHTML = "";
                }
            }
        }

        var identitycertificatenumber = document.getElementById('identitycertificatenumber').value;
        if (identitycertificatenumber == "") {
            document.getElementById('identitycertificatenumbererr').innerHTML = "<a href='#identitycertificatenumber' style='color:red'>6.1 Please Enter Passport/ Identity Certificate Number</a><br/>";
            flag = 1;
        } else if (special_regex.test(identitycertificatenumber)) {
            document.getElementById('identitycertificatenumbererr').innerHTML = "<a href='#identitycertificatenumber' style='color:red'>6.1 In Passport/ Identity Certificate only Numbers & Alphabets are allowed</a><br/>";
            flag = 1;
        } else if (identitycertificatenumber.length < 8 || identitycertificatenumber.length > 8) {
            document.getElementById('identitycertificatenumbererr').innerHTML = "<a href='#identitycertificatenumber' style='color:red'>6.1 Passport should be of 8 digits</a><br/>";
            flag = 1;
        } else {
            document.getElementById('identitycertificatenumbererr').innerHTML = "";
        }

        var issuedate = document.getElementById('issuedate').value;
        if (issuedate == "") {
            document.getElementById('issuedateerr').innerHTML = "<a href='#issuedate' style='color:red'>6.1 Please Enter Date of Issue (DD-MM-YYYY)</a><br/>";
            flag = 1;
        } else if (new Date(issuedate) >= today) {
            document.getElementById('issuedateerr').innerHTML = "<a href='#issuedate' style='color:red'>6.1 Issue Date Can't be in future Date</a><br/>";
            flag = 1;
        } else {
            document.getElementById('issuedateerr').innerHTML = "";
        }

        var expirydate = document.getElementById('expirydate').value;
        if (expirydate == "") {
            document.getElementById('expirydateerr').innerHTML = "<a href='#expirydate' style='color:red'>6.1 Please Enter Expiry Date (DD-MM-YYYY)</a><br/>";
            flag = 1;
        } else if (issuedate != "" && (new Date(expirydate) <= new Date(issuedate))) {
            document.getElementById('expirydateerr').innerHTML = "<a href='#expirydate' style='color:red'>6.1 Expiry Date Can't be before Issue Date</a><br/>";
            flag = 1;
        } else {
            document.getElementById('expirydateerr').innerHTML = "";
        }

        var issuepalce = document.getElementById('issuepalce').value;
        if (issuepalce == "") {
            document.getElementById('issuepalceerr').innerHTML = "<a href='#issuepalce' style='color:red'>6.1 Please Enter Place of Issue </a><br/>";
            flag = 1;
        } else if (special_number_regex.test(issuepalce)) {
            document.getElementById('issuepalceerr').innerHTML = "<a href='#issuepalce' style='color:red'>6.1 In Place of Issue Field Number & Special character are not allowed </a><br/>";
            flag = 1;
        } else {
            document.getElementById('issuepalceerr').innerHTML = "";
        }

        if (document.querySelectorAll('input[type="radio"][name="everapplied"]:checked').length == 0) {
            document.getElementById('everappliederr').innerHTML = "<a href='#everappliedyes' style='color:red'>6.2 Please Select Ever applied for passport, but not issued?</a><br/>";
            flag = 1;
        } else {
            document.getElementById('everappliederr').innerHTML = "";
        }

        if (section6flag == 1) {
            if (everappliedflag == 1) {
                var everappliedfilenumber = document.getElementById('everappliedfilenumber').value;
                if (everappliedfilenumber == "") {
                    document.getElementById('everappliedfilenumbererr').innerHTML = "<a href='#everappliedfilenumber' style='color:red'>6.2 Please Enter File Number</a><br/>";
                    flag = 1;
                } else if (isNaN(everappliedfilenumber) || special_regex.test(everappliedfilenumber)) {
                    document.getElementById('everappliedfilenumbererr').innerHTML = "<a href='#everappliedfilenumber' style='color:red'>6.2 In File Number only Numbers are allowed</a><br/>";
                    flag = 1;
                } else {
                    document.getElementById('everappliedfilenumbererr').innerHTML = "";
                }

                var applyingmonth = document.getElementById('applyingmonth').value;
                if (applyingmonth == "") {
                    document.getElementById('applyingmontherr').innerHTML = "<a href='#applyingmonth' style='color:red'>6.2 Please Enter Month and Year of applying</a><br/>";
                    flag = 1;
                } else {
                    document.getElementById('applyingmontherr').innerHTML = "";
                }

                var appliedoffice = document.getElementById('appliedoffice').value;
                if (appliedoffice == "") {
                    document.getElementById('appliedofficeerr').innerHTML = "<a href='#appliedoffice' style='color:red'>6.2 Please Enter Name of passport office where applied </a><br/>";
                    flag = 1;
                } else if (special_number_regex.test(appliedoffice)) {
                    document.getElementById('appliedofficeerr').innerHTML = "<a href='#appliedoffice' style='color:red'>6.2 In Name of passport office where applied Field Number & Special character are not allowed </a><br/>";
                    flag = 1;
                } else {
                    document.getElementById('appliedofficeerr').innerHTML = "";
                }
            }
        } else {
            document.getElementById('everappliedfilenumbererr').innerHTML = "";
            document.getElementById('applyingmontherr').innerHTML = "";
            document.getElementById('appliedofficeerr').innerHTML = "";
        }

    } else {
        document.getElementById('issueerr').innerHTML = "";
        document.getElementById('changeerr').innerHTML = "";
        document.getElementById('identitycertificatenumbererr').innerHTML = "";
        document.getElementById('issuedateerr').innerHTML = "";
        document.getElementById('expirydateerr').innerHTML = "";
        document.getElementById('issuepalceerr').innerHTML = "";
        document.getElementById('everappliederr').innerHTML = "";
    }


    if (document.querySelectorAll('input[type="radio"][name="applicants"]:checked').length == 0) {
        document.getElementById('applicantserr').innerHTML = "<a href='#normal-application' style='color:red'>1.4 Please Select Type of Application</a><br/>";
        flag = 1;
        // window.location = "#normal-application";
        // alert("Please check applicant");
    } else {
        document.getElementById('applicantserr').innerHTML = "";
    }

    if (document.querySelectorAll('input[type="radio"][name="page"]:checked').length == 0) {
        document.getElementById('pageerr').innerHTML = "<a href='#page36' style='color:red'>1.5 Please Select Type of Passport Booklet</a><br/>";
        flag = 1;
    } else {
        document.getElementById('pageerr').innerHTML = "";
    }

    if (document.querySelectorAll('input[type="radio"][name="validity"]:checked').length == 0) {
        document.getElementById('validityerr').innerHTML = "<a href='#validity-10' style='color:red'>1.6 Please Select Validity Required</a><br/>";
        flag = 1;
    } else {
        document.getElementById('validityerr').innerHTML = "";
    }

    var fname = document.getElementById('fname').value;
    if (fname == "") {
        document.getElementById('userfname').innerHTML = "<a href='#fname' style='color:red'>2.1 Please Enter First Name </a><br/>";
        flag = 1;
    } else if (special_number_regex.test(fname)) {
        document.getElementById('userfname').innerHTML = "<a href='#fname' style='color:red'>2.1 In First Name Field Number & Special character are not allowed </a><br/>";
        flag = 1;
    } else {
        document.getElementById('userfname').innerHTML = "";
    }



    var sname = document.getElementById('sname').value;
    if (sname == "") {
        document.getElementById('usersname').innerHTML = "<a href='#sname' style='color:red'>2.1 Please Enter Surname Name </a><br/>";
        flag = 1;
    } else if (special_number_regex.test(sname)) {
        document.getElementById('usersname').innerHTML = "<a href='#sname' style='color:red'>2.1 In Surname Name Field Number & Special character are not allowed </a><br/>";
        flag = 1;
    } else {
        document.getElementById('usersname').innerHTML = "";
    }

    if (document.querySelectorAll('input[type="radio"][name="othername"]:checked').length == 0) {
        document.getElementById('othernameerr').innerHTML = "<a href='#lblothername' style='color:red'>2.2 Please Select (Yes / No) Are you known by any other names (aliases)? </a><br/ > ";
        flag = 1;
    } else {
        document.getElementById('othernameerr').innerHTML = "";
    }

    if (document.querySelectorAll('input[type="radio"][name="changedname"]:checked').length == 0) {
        document.getElementById('changednameerr').innerHTML = "<a href='#lblchangedname' style='color:red'>2.3 Please Select (Yes / No) Have you ever changed your name? </a><br/ > ";
        flag = 1;
    } else {
        document.getElementById('changednameerr').innerHTML = "";
    }



    var todaybd = new Date();
    past_month = todaybd.setMonth(today.getMonth() - 1);
    var birthdate = document.getElementById('birthdate').value;
    if (birthdate == "") {
        document.getElementById('birthdateerr').innerHTML = "<a href='#birthdate' style='color:red'>2.4 Please Enter Date of Birth (DD-MM-YYYY)</a><br/>";
        flag = 1;
    } else if (new Date(birthdate) > past_month) {
        document.getElementById('birthdateerr').innerHTML = "<a href='#birthdate' style='color:red'>2.4 Birth Date should be atleast 1 month less than today</a><br/>";
        flag = 1;
    } else {
        document.getElementById('birthdateerr').innerHTML = "";
    }


    var india = document.getElementById("india").checked;
    var outsideindia = document.getElementById("outsideindia").checked;
    if (india == false & outsideindia == false) {
        document.getElementById('selectcountryerr').innerHTML = "<a href='#selectcountry' style='color:red'>2.5 Please Select India or OutSide India </a><br/ > ";
        flag = 1;
    } else if (selectcountry.value == 1) {
        document.getElementById('selectcountryerr').innerHTML = "";
        var birthcity = document.getElementById('birthcity').value;
        if (birthcity == "") {
            document.getElementById('birthcityerr').innerHTML = "<a href='#birthcity' style='color:red'>2.5 Please Enter (Village/Town/City) Name </a><br/>";
            flag = 1;
        } else if (special_number_regex.test(birthcity)) {
            document.getElementById('birthcityerr').innerHTML = "<a href='#birthcity' style='color:red'>2.5 In Village/Town/City Name Field Number & Special character are not allowed </a><br/>";
            flag = 1;
        } else {
            document.getElementById('birthcityerr').innerHTML = "";
        }

        var txtdistrict = document.getElementById('txtdistrict').value;
        if (txtdistrict == "") {
            document.getElementById('txtdistricterr').innerHTML = "<a href='#txtdistrict' style='color:red'>2.5 Please Enter District (If born in India)</a><br/>";
            flag = 1;
        } else if (special_number_regex.test(txtdistrict)) {
            document.getElementById('txtdistricterr').innerHTML = "<a href='#txtdistrict' style='color:red'>2.5 In District Name Field Number & Special character are not allowed </a><br/>";
            flag = 1;
        } else {
            document.getElementById('txtdistricterr').innerHTML = "";
        }

        var txtstate = document.getElementById('txtstate').value;
        if (txtstate == "") {
            document.getElementById('txtstateerr').innerHTML = "<a href='#txtstate' style='color:red'>2.5 Please Enter State/ UT (If born in India) </a><br/>";
            flag = 1;
        } else if (special_number_regex.test(txtstate)) {
            document.getElementById('txtstateerr').innerHTML = "<a href='#txtstate' style='color:red'>2.5 In State / UT Name Field Number & Special character are not allowed </a><br/>";
            flag = 1;
        } else if (txtstate.toLowerCase() == birthcity.toLowerCase()) {
            document.getElementById('txtstateerr').innerHTML = "<a href='#txtstate' style='color:red'>2.5 Birth State and Birth Place can not be same. </a><br/>";
            flag = 1;
        } else if (txtstate.toLowerCase() == txtdistrict.toLowerCase()) {
            document.getElementById('txtstateerr').innerHTML = "<a href='#txtstate' style='color:red'>2.5 Birth State and Birth District can not be same. </a><br/>";
            flag = 1;
        } else {
            document.getElementById('txtstateerr').innerHTML = "";
        }

    } else if (selectcountry.value == 2) {
        document.getElementById('selectcountryerr').innerHTML = "";
        var country = document.getElementById('country').value;
        if (country == "") {
            document.getElementById('countryerr').innerHTML = "<a href='#country' style='color:red'>2.5 Please Enter Region/Country </a><br/>";
            flag = 1;
        } else if (special_number_regex.test(country)) {
            document.getElementById('countryerr').innerHTML = "<a href='#country' style='color:red'>2.5 In Country Name Field Number & Special character are not allowed </a><br/>";
            flag = 1;
        } else if (country.toLowerCase() == "india") {
            document.getElementById('countryerr').innerHTML = "<a href='#country' style='color:red'>2.5 input can't be India </a><br/>";
            flag = 1;
        } else {
            document.getElementById('countryerr').innerHTML = "";
        }
    } else {
        document.getElementById('selectcountryerr').innerHTML = "";
    }

    if (document.querySelectorAll('input[type="radio"][name="gender"]:checked').length == 0) {
        document.getElementById('gendererr').innerHTML = "<a href='#lblgender' style='color:red'>2.6 Please Select Any One from Gender  </a><br/ > ";
        flag = 1;
    } else {
        document.getElementById('gendererr').innerHTML = "";
    }

    if (document.querySelectorAll('input[type="radio"][name="citizenship"]:checked').length == 0) {
        document.getElementById('citizenshiperr').innerHTML = "<a href='#lblcitizenship' style='color:red'>2.7 Please Select Any One from Citizenship of India by: </a><br/ > ";
        flag = 1;
    } else {
        document.getElementById('citizenshiperr').innerHTML = "";
    }

    if (document.querySelectorAll('input[type="radio"][name="maritalstatus"]:checked').length == 0) {
        document.getElementById('maritalstatuserr').innerHTML = "<a href='#lblmaritalstatus' style='color:red'>2.8 Please Select Any One from Marital Status: </a><br/ > ";
        flag = 1;
    } else {
        document.getElementById('maritalstatuserr').innerHTML = "";
    }

    // ----2.10----

    var voter = document.getElementById('voter').value;
    if (voter == "") {
        document.getElementById('votererr').innerHTML = "<a href='#voter' style='color:red'>2.10 Please enter Voter ID </a><br/>";
        flag = 1;
    } else {
        if (isAlphaNumeric(voter) == false) {
            document.getElementById('votererr').innerHTML = "<a href='#voter' style='color:red'>2.10  Voter ID should be alphanumeric must not contain any special characters</a><br/>";
            flag = 1;
        } else if (isMinLimitTrue(voter, 12) == false) {
            document.getElementById('votererr').innerHTML = "<a href='#voter' style='color:red'>2.10 Voter ID should be of maximum 12 character </a><br/>";
            // alert("Filenumber should be of maximum 12 character");
            flag = 1;
        } else if (isMaxLimitTrue(voter, 12) == false) {
            document.getElementById('votererr').innerHTML = "<a href='#voter' style='color:red'> 2.10 Voter ID should be of minimum 12 character </a><br/>";
            // alert("Filenumber should be of minimum 12 character");
            flag = 1;
        } else if (special_number_regex.test(voter[2])) {
            document.getElementById('votererr').innerHTML = "<a href='#voter' style='color:red'>2.10 File number should start with Alphabet </a><br/>";
            flag = 1;
        } else {
            document.getElementById('votererr').innerHTML = "";
        }
    }


    //----2.11----
    if (document.querySelectorAll('input[type="radio"][name="employment"]:checked').length == 0) {
        document.getElementById('employmenterr').innerHTML = "<a href='#lblemployment' style='color:red'>2.11 Please Select Any One from Employment Type </a><br/ > ";
        flag = 1;
    } else {
        document.getElementById('employmenterr').innerHTML = "";
    }

    //----2.12----
    var employed = document.getElementById('employed').value;
    if (employmentflag == 1) {
        if (document.getElementById('employed').value == "") {
            document.getElementById('employederr').innerHTML = "<a href='#employed' style='color:red'>2.12 Please Enter Organization name </a><br/ > ";
            flag = 1;
        } else if (special_number_regex.test(employed)) {
            document.getElementById('employederr').innerHTML = "<a href='#employed' style='color:red'>2.12 In Organization Name Field Number & Special character are not allowed </a><br/>";
            flag = 1;
        } else if (employed.length > 60) {
            document.getElementById('employederr').innerHTML = "<a href='#employed' style='color:red'>2.12 In Organization Name Field More then 60 letters are not allowed </a><br/>";
            flag = 1;
        } else {
            document.getElementById('employederr').innerHTML = "";
        }
    } else {
        document.getElementById('employederr').innerHTML = "";
    }



    if (document.querySelectorAll('input[type="radio"][name="parent"]:checked').length == 0) {
        document.getElementById('parenterr').innerHTML = "<a href='#lblparent' style='color:red'>2.13 Please Select Any One from Is either of your parent (in case of minor)/ spouse, a government servant? </a><br/ > ";
        flag = 1;
    } else {
        document.getElementById('parenterr').innerHTML = "";
    }

    if (document.querySelectorAll('input[type="radio"][name="qualification"]:checked').length == 0) {
        document.getElementById('qualificationerr').innerHTML = "<a href='#lblqualification' style='color:red'>2.14 Please Select Any One from Educational Qualification </a><br/ > ";
        flag = 1;
    } else {
        document.getElementById('qualificationerr').innerHTML = "";
    }

    if (document.querySelectorAll('input[type="radio"][name="nonecr"]:checked').length == 0) {
        document.getElementById('nonecrerr').innerHTML = "<a href='#lblnonecr' style='color:red'>2.15 Please Select Any One from Are you eligible for Non-ECR category? </a><br/ > ";
        flag = 1;
    } else {
        document.getElementById('nonecrerr').innerHTML = "";
    }



    var aadhar = document.getElementById('aadhar').value;
    if (aadhar == "") {
        document.getElementById('aadharerr').innerHTML = "<a href='#aadhar' style='color:red'>2.17 Please Enter Aadhaar Number </a><br/>";
        flag = 1;
    } else if (isNaN(aadhar)) {
        document.getElementById('aadharerr').innerHTML = "<a href='#aadhar' style='color:red'>2.17 Aadhaar Number field must contain only digits</a><br/>";
        flag = 1;
    } else if (aadhar.length < 12 || aadhar.length > 12) {
        document.getElementById('aadharerr').innerHTML = "<a href='#aadhar' style='color:red'>2.17 Aadhaar Number should be of 12 digits</a><br/>";
        flag = 1;
    } else {
        document.getElementById('aadharerr').innerHTML = "";
    }

    var fatherfname = document.getElementById('fatherfname').value;
    if (fatherfname == "") {
        document.getElementById('fatherfnameerr').innerHTML = "<a href='#fatherfname' style='color:red'>3.1 Please Enter Father's First Name </a><br/>";
        flag = 1;
    } else if (special_number_regex.test(fatherfname)) {
        document.getElementById('fatherfnameerr').innerHTML = "<a href='#fatherfname' style='color:red'>3.1 In Father First Name Field Number & Special character are not allowed </a><br/>";
        flag = 1;
    } else {
        document.getElementById('fatherfnameerr').innerHTML = "";
    }

    var fathersname = document.getElementById('fathersname').value;
    if (fathersname == "") {
        document.getElementById('fathersnameerr').innerHTML = "<a href='#fathersname' style='color:red'>3.1 Please Enter Father's Surname </a><br/>";
        flag = 1;
    } else if (special_number_regex.test(fathersname)) {
        document.getElementById('fathersnameerr').innerHTML = "<a href='#fathersname' style='color:red'>3.1 In Father Surname Name Field Number & Special character are not allowed </a><br/>";
        flag = 1;
    } else {
        document.getElementById('fathersnameerr').innerHTML = "";
    }

    var motherfname = document.getElementById('motherfname').value;
    if (motherfname == "") {
        document.getElementById('motherfnameerr').innerHTML = "<a href='#motherfname' style='color:red'>3.2 Please Enter Mother's First Name </a><br/>";
        flag = 1;
    } else if (special_number_regex.test(motherfname)) {
        document.getElementById('motherfnameerr').innerHTML = "<a href='#motherfname' style='color:red'>3.2 In Mother First Name Field Number & Special character are not allowed </a><br/>";
        flag = 1;
    } else {
        document.getElementById('motherfnameerr').innerHTML = "";
    }

    var mothersname = document.getElementById('mothersname').value;
    if (mothersname == "") {
        document.getElementById('mothersnameerr').innerHTML = "<a href='#mothersname' style='color:red'>3.2 Please Enter Mother's Surname </a><br/>";
        flag = 1;
    } else if (special_number_regex.test(mothersname)) {
        document.getElementById('mothesfnameerr').innerHTML = "<a href='#mothersname' style='color:red'>3.2 In Mother Surname Field Number & Special character are not allowed </a><br/>";
        flag = 1;
    } else {
        document.getElementById('mothersnameerr').innerHTML = "";
    }

    var guardianfname = document.getElementById('guardianfname').value;
    if (guardianfname == "") {
        document.getElementById('guardianfnameerr').innerHTML = "<a href='#guardianfname' style='color:red'>3.2 Please Enter Guardian's First Name </a><br/>";
        flag = 1;
    } else if (special_number_regex.test(guardianfname)) {
        document.getElementById('guardianfnameerr').innerHTML = "<a href='#guardianfname' style='color:red'>3.2 In Guardian First Name Field Number & Special character are not allowed </a><br/>";
        flag = 1;
    } else {
        document.getElementById('guardianfnameerr').innerHTML = "";
    }

    var guardiansname = document.getElementById('guardiansname').value;
    if (guardiansname == "") {
        document.getElementById('guardiansnameerr').innerHTML = "<a href='#guardiansname' style='color:red'>3.2 Please Enter Guardian's Surname </a><br/>";
        flag = 1;
    } else if (special_number_regex.test(guardiansname)) {
        document.getElementById('guardiansnameerr').innerHTML = "<a href='#guardiansname' style='color:red'>3.2 In Guardian Surname Field Number & Special character are not allowed </a><br/>";
        flag = 1;
    } else {
        document.getElementById('guardiansnameerr').innerHTML = "";
    }

    var spousefname = document.getElementById('spousefname').value;
    if (spousefname == "") {
        document.getElementById('spousefnameerr').innerHTML = "<a href='#spousefname' style='color:red'>3.2 Please Enter Spouse's  First Name </a><br/>";
        flag = 1;
    } else if (special_number_regex.test(spousefname)) {
        document.getElementById('spousefnameerr').innerHTML = "<a href='#spousefname' style='color:red'>3.2 In Spouse's  First Name Field Number & Special character are not allowed </a><br/>";
        flag = 1;
    } else {
        document.getElementById('spousefnameerr').innerHTML = "";
    }

    var spousesname = document.getElementById('spousesname').value;
    if (spousesname == "") {
        document.getElementById('spousesnameerr').innerHTML = "<a href='#spousesname' style='color:red'>3.2 Please Enter Spouse's  Surname </a><br/>";
        flag = 1;
    } else if (special_number_regex.test(spousesname)) {
        document.getElementById('spousesnameerr').innerHTML = "<a href='#spousesname' style='color:red'>3.2 In Spouse's  Surname Field Number & Special character are not allowed </a><br/>";
        flag = 1;
    } else {
        document.getElementById('spousesnameerr').innerHTML = "";
    }

    // ----4.1----
    var address = document.getElementById('address').value;
    if (address == "") {
        document.getElementById('addresserr').innerHTML = "<a href='#address' style='color:red'>4.1 Please Enter House No. and Street Name Address </a><br/>";
        flag = 1;
    } else if (address_regex.test(address)) {
        document.getElementById('addresserr').innerHTML = "<a href='#address' style='color:red'>4.1 House No. and Street name have unacceptable special characters </a><br/>";
        flag = 1;
    } else if (address.length < 10) {
        document.getElementById('addresserr').innerHTML = "<a href='#address' style='color:red'>4.1 House No. and Street name should have atleast 10 characters </a><br/>";
        flag = 1;
    } else {
        document.getElementById('addresserr').innerHTML = "";
    }

    var city = document.getElementById('city').value;
    if (city == "") {
        document.getElementById('cityerr').innerHTML = "<a href='#city' style='color:red'>4.1 Please Enter Village or Town or City </a><br/>";
        flag = 1;
    } else if (special_number_regex.test(city)) {
        document.getElementById('cityerr').innerHTML = "<a href='#city' style='color:red'>4.1 In Village/City/Town Name Field Number & Special character are not allowed </a><br/>";
        flag = 1;
    } else {
        document.getElementById('cityerr').innerHTML = "";
    }

    var police = document.getElementById('police').value;
    if (police == "") {
        document.getElementById('policeerr').innerHTML = "<a href='#police' style='color:red'>4.1 Please Enter Police Station </a><br/>";
        flag = 1;
    } else if (special_number_regex.test(police)) {
        document.getElementById('policeerr').innerHTML = "<a href='#police' style='color:red'>4.1 In Police Station Field Number & Special character are not allowed </a><br/>";
        flag = 1;
    } else {
        document.getElementById('policeerr').innerHTML = "";
    }

    var pin = document.getElementById('pin').value;
    if (pin == "") {
        document.getElementById('pinerr').innerHTML = "<a href='#pin' style='color:red'>4.1 Please Enter PIN Code </a><br/>";
        flag = 1;
    } else if (isNaN(pin)) {
        document.getElementById('pinerr').innerHTML = "<a href='#pin' style='color:red'>4.1 PIN Code field must contain only digits</a><br/>";
        flag = 1;
    } else if (pin.length < 6 || pin.length > 6) {
        document.getElementById('pinerr').innerHTML = "<a href='#pin' style='color:red'>4.1 PIN Code should be of 6 digits</a><br/>";
        flag = 1;
    } else {
        document.getElementById('pinerr').innerHTML = "";
    }

    var district = document.getElementById('district').value;
    if (district == "") {
        document.getElementById('districterr').innerHTML = "<a href='#district' style='color:red'>4.1 Please Enter District </a><br/>";
        flag = 1;
    } else if (special_number_regex.test(district)) {
        document.getElementById('districterr').innerHTML = "<a href='#district' style='color:red'>4.1 In District Field Number & Special character are not allowed </a><br/>";
        flag = 1;
    } else {
        document.getElementById('districterr').innerHTML = "";
    }

    var state = document.getElementById('state').value;
    if (state == "") {
        document.getElementById('stateerr').innerHTML = "<a href='#state' style='color:red'>4.1 Please Enter State/ UT </a><br/>";
        flag = 1;
    } else if (special_number_regex.test(state)) {
        document.getElementById('stateerr').innerHTML = "<a href='#state' style='color:red'>4.1 In State Field Number & Special character are not allowed </a><br/>";
        flag = 1;
    } else {
        document.getElementById('stateerr').innerHTML = "";
    }

    var mobinumber = document.getElementById('mobinumber').value;
    if (mobinumber == "") {
        document.getElementById('mobinumbererr').innerHTML = "<a href='#mobinumber' style='color:red'>4.1 Please Enter Mobile Number </a><br/>";
        flag = 1;
    } else if (isNaN(mobinumber)) {
        document.getElementById('mobinumbererr').innerHTML = "<a href='#mobinumber' style='color:red'>4.1 Mobile Number field must contain only digits </a><br/>";
        flag = 1;
    } else if (mobinumber.length < 10 || mobinumber.length > 10) {
        document.getElementById('mobinumbererr').innerHTML = "<a href='#mobinumber' style='color:red'>Mobile Number should be of 10 digits </a><br/>";
        flag = 1;
    } else {
        document.getElementById('mobinumbererr').innerHTML = "";
    }

    var email = document.getElementById('email').value;
    if (email == "") {
        document.getElementById('emailerr').innerHTML = "<a href='#email' style='color:red'>4.1 Please Enter E-mail ID </a><br/>";
        flag = 1;
    } else if (!email_regex.test(email)) {
        document.getElementById('emailerr').innerHTML = "<a href='#email' style='color:red'>4.1 Email ID is Invalid</a><br/>";
        flag = 1;
    } else {
        document.getElementById('emailerr').innerHTML = "";
    }


    //----4.2----
    if (document.querySelectorAll('input[type="radio"][name="permanentaddress"]:checked').length == 0) {
        document.getElementById('permanentaddresserr').innerHTML = "<a href='#lblpermanentaddress' style='color:red'>4.2 Please select permanent address same as present address? Yes or No </a><br/ > ";
        flag = 1;
    } else {
        document.getElementById('permanentaddresserr').innerHTML = "";
    }


    if (sameaddressflag == 1) {
        var emergencycontactname = document.getElementById('emergencycontactname').value;
        var emergencyaddress = document.getElementById('emergencyaddress').value;
        var emergencyemail = document.getElementById('emergencyemail').value;
        //Emergency Contact Name
        if (emergencycontactname == "") {
            document.getElementById('emergencycontactnameerr').innerHTML = "<a href='#lblemergencycontactname' style='color:red'>5 Please Enter Emergency Name </a><br/ > ";
            flag = 1;
        } else if (special_number_regex.test(emergencycontactname)) {
            document.getElementById('emergencycontactnameerr').innerHTML = "<a href='#lblemergencycontactname' style='color:red'>5  Emergency Contact person Name field must contain only alphabets </a><br/ > ";
            flag = 1;
        } else {
            document.getElementById('emergencycontactnameerr').innerHTML = "";
        }

        //emergency address
        if (emergencyaddress == "") {
            document.getElementById('emergencyaddresserr').innerHTML = "<a href='#lblemergencyaddress' style='color:red'>5 Please Enter Emergency Address </a><br/ > ";
            flag = 1;
        } else if (address_regex.test(emergencyaddress)) {
            document.getElementById('emergencyaddresserr').innerHTML = "<a href='#lblemergencycontactname' style='color:red'>5 Given input have unacceptable special characters in Emergancy address </a><br/ > ";
            flag = 1;
        } else {
            document.getElementById('emergencyaddresserr').innerHTML = "";
        }

        // email
        if (emergencyemail == "") {
            document.getElementById('emergencyemailerr').innerHTML = "<a href='#lblemergencyemail' style='color:red'>5 Please enter Emergency Contact person Email ID  </a><br/ > ";
            flag = 1;
        } else if (!email_regex.test(emergencyemail)) {
            document.getElementById('emergencyemailerr').innerHTML = "<a href='#lblemergencyemail' style='color:red'>5 Email ID is Invalid</a><br/>";
            flag = 1;
        } else {
            document.getElementById('emergencyemailerr').innerHTML = "";
        }
    } else {
        document.getElementById('emergencycontactnameerr').innerHTML = "";
        document.getElementById('emergencyaddresserr').innerHTML = "";
        document.getElementById('emergencyemailerr').innerHTML = "";
    }









    //----7.1----
    if (document.querySelectorAll('input[type="radio"][name="criminal1"]:checked').length == 0) {
        document.getElementById('criminal1err').innerHTML = "<a href='#lblcriminal1' style='color:red'>7.1.1 Please Select Yes or No </a><br/ > ";
        flag = 1;
    } else {
        document.getElementById('criminal1err').innerHTML = "";
    }

    if (document.querySelectorAll('input[type="radio"][name="criminal2"]:checked').length == 0) {
        document.getElementById('criminal2err').innerHTML = "<a href='#lblcriminal2' style='color:red'>7.1.2 Please Select Yes or No </a><br/ > ";
        flag = 1;
    } else {
        document.getElementById('criminal2err').innerHTML = "";
    }

    if (document.querySelectorAll('input[type="radio"][name="criminal3"]:checked').length == 0) {
        document.getElementById('criminal3err').innerHTML = "<a href='#lblcriminal3' style='color:red'>7.1.3 Please Select Yes or No </a><br/ > ";
        flag = 1;
    } else {
        document.getElementById('criminal3err').innerHTML = "";
    }

    if (document.querySelectorAll('input[type="radio"][name="criminal4"]:checked').length == 0) {
        document.getElementById('criminal4err').innerHTML = "<a href='#lblcriminal4' style='color:red'>7.1.4 Please Select Yes or No </a><br/ > ";
        flag = 1;
    } else {
        document.getElementById('criminal4err').innerHTML = "";
    }

    if (document.querySelectorAll('input[type="radio"][name="criminal5"]:checked').length == 0) {
        document.getElementById('criminal5err').innerHTML = "<a href='#lblcriminal5' style='color:red'>7.2.1 Please Select Yes or No</a><br/ > ";
        flag = 1;
    } else {
        document.getElementById('criminal5err').innerHTML = "";
    }

    if (document.querySelectorAll('input[type="radio"][name="criminal6"]:checked').length == 0) {
        document.getElementById('criminal6err').innerHTML = "<a href='#lblcriminal6' style='color:red'>7.3.1 Please Select Yes or No </a><br/ > ";
        flag = 1;
    } else {
        document.getElementById('criminal6err').innerHTML = "";
    }

    if (document.querySelectorAll('input[type="radio"][name="criminal7"]:checked').length == 0) {
        document.getElementById('criminal7err').innerHTML = "<a href='#lblcriminal7' style='color:red'>7.3.2 Please Select Yes or No </a><br/ > ";
        flag = 1;
    } else {
        document.getElementById('criminal7err').innerHTML = "";
    }

    if (document.querySelectorAll('input[type="radio"][name="criminal8"]:checked').length == 0) {
        document.getElementById('criminal8err').innerHTML = "<a href='#lblcriminal8' style='color:red'>7.3.3 Please Select Yes or No </a><br/ > ";
        flag = 1;
    } else {
        document.getElementById('criminal8err').innerHTML = "";
    }

    if (document.querySelectorAll('input[type="radio"][name="criminal9"]:checked').length == 0) {
        document.getElementById('criminal9err').innerHTML = "<a href='#lblcriminal9' style='color:red'>7.4.1 Please Select Yes or No </a><br/ > ";
        flag = 1;
    } else {
        document.getElementById('criminal9err').innerHTML = "";
    }

    if (document.querySelectorAll('input[type="radio"][name="criminal10"]:checked').length == 0) {
        document.getElementById('criminal10err').innerHTML = "<a href='#lblcriminal10' style='color:red'>7.4.2 Please Select Yes or No </a><br/ > ";
        flag = 1;
    } else {
        document.getElementById('criminal10err').innerHTML = "";
    }

    if (document.querySelectorAll('input[type="radio"][name="criminal11"]:checked').length == 0) {
        document.getElementById('criminal11err').innerHTML = "<a href='#lblcriminal11' style='color:red'>7.4.3 Please Select Yes or No </a><br/ > ";
        flag = 1;
    } else {
        document.getElementById('criminal11err').innerHTML = "";
    }

    if (document.querySelectorAll('input[type="radio"][name="criminal12"]:checked').length == 0) {
        document.getElementById('criminal12err').innerHTML = "<a href='#lblcriminal12' style='color:red'>7.4.4 Please Select Yes or No </a><br/ > ";
        flag = 1;
    } else {
        document.getElementById('criminal12err').innerHTML = "";
    }

    if (document.querySelectorAll('input[type="radio"][name="criminal13"]:checked').length == 0) {
        document.getElementById('criminal13err').innerHTML = "<a href='#lblcriminal13' style='color:red'>7.5.1 Please Select Yes or No </a><br/ > ";
        flag = 1;
    } else {
        document.getElementById('criminal13err').innerHTML = "";
    }

    if (document.querySelectorAll('input[type="radio"][name="criminal14"]:checked').length == 0) {
        document.getElementById('criminal14err').innerHTML = "<a href='#lblcriminal14' style='color:red'>7.5.2 Please Select Yes or No </a><br/ > ";
        flag = 1;
    } else {
        document.getElementById('criminal14err').innerHTML = "";
    }

    if (document.querySelectorAll('input[type="radio"][name="criminal15"]:checked').length == 0) {
        document.getElementById('criminal15err').innerHTML = "<a href='#lblcriminal15' style='color:red'>7.5.3 Please Select Yes or No </a><br/ > ";
        flag = 1;
    } else {
        document.getElementById('criminal15err').innerHTML = "";
    }


    // ----8.1----
    var feeamount = document.getElementById('feeamount').value;
    if (feeamount == "") {
        document.getElementById('feeamounterr').innerHTML = "<a href='#feeamount' style='color:red'>8.1 Please Enter Fee Amount</a><br/>";
        flag = 1;
    } else if (isNaN(feeamount)) {
        document.getElementById('feeamounterr').innerHTML = "<a href='#feeamount' style='color:red'>8.1 Please Enter Fee Amount in Numbers or decimal</a><br/>";
        flag = 1;
    } else {
        document.getElementById('feeamounterr').innerHTML = "";
    }

    // ----8.2----
    var ddnumber = document.getElementById('ddnumber').value;
    if (ddnumber == "") {
        document.getElementById('ddnumbererr').innerHTML = "<a href='#ddnumber' style='color:red'>8.2 Please Enter DD Number</a><br/>";
        flag = 1;
    } else if (isNaN(ddnumber) || special_regex.test(ddnumber)) {
        document.getElementById('ddnumbererr').innerHTML = "<a href='#ddnumber' style='color:red'>8.2 DD Number field must contain only Number</a><br/>";
        flag = 1;
    } else {
        document.getElementById('ddnumbererr').innerHTML = "";
    }

    var ddissuedate = document.getElementById('ddissuedate').value;
    if (ddissuedate == "") {
        document.getElementById('ddissuedateerr').innerHTML = "<a href='#ddissuedate' style='color:red'>8.2 Please Enter DD Issue Date (DD-MM-YYYY)</a><br/>";
        flag = 1;
    } else if (new Date(ddissuedate) >= today) {
        document.getElementById('ddissuedateerr').innerHTML = "<a href='#ddissuedate' style='color:red'>8.2 Issue Date Can't be in future Date</a><br/>";
        flag = 1;
    } else {
        document.getElementById('ddissuedateerr').innerHTML = "";
    }

    var ddexpirydate = document.getElementById('ddexpirydate').value;
    if (ddexpirydate == "") {
        document.getElementById('ddexpirydateerr').innerHTML = "<a href='#ddexpirydate' style='color:red'>8.2 Please Enter DD Expiry Date (DD-MM-YYYY)</a><br/>";
        flag = 1;
    } else if (ddissuedate != "" && (new Date(ddexpirydate) <= new Date(ddissuedate))) {
        document.getElementById('ddexpirydateerr').innerHTML = "<a href='#ddexpirydate' style='color:red'>8.2 Expiry Date Can't be before Issue Date</a><br/>";
        flag = 1;
    } else {
        document.getElementById('ddexpirydateerr').innerHTML = "";
    }

    var bank = document.getElementById('bank').value;
    if (bank == "") {
        document.getElementById('bankerr').innerHTML = "<a href='#bank' style='color:red'>8.2 Please Enter Bank Name</a><br/>";
        flag = 1;
    } else {
        document.getElementById('bankerr').innerHTML = "";
    }

    var branch = document.getElementById('branch').value;
    if (branch == "") {
        document.getElementById('brancherr').innerHTML = "<a href='#branch' style='color:red'>8.2 Please Enter Branch Name</a><br/>";
        flag = 1;
    } else {
        document.getElementById('brancherr').innerHTML = "";
    }


    //----9----
    var enclosures1 = document.getElementById('enclosures1').value;
    if (enclosures1 == "") {
        document.getElementById('enclosures1err').innerHTML = "<a href='#enclosures1' style='color:red'>9 Please Enter atlaest one Enclosures</a><br/>";
        flag = 1;
    } else {
        document.getElementById('enclosures1err').innerHTML = "";
    }

    var place = document.getElementById('place').value;
    if (place == "") {
        document.getElementById('placeerr').innerHTML = "<a href='#place' style='color:red'>10 Please Enter Place</a><br/>";
        flag = 1;
    } else if (special_number_regex.test(place)) {
        document.getElementById('placeerr').innerHTML = "<a href='#place' style='color:red'>10 In Declaration place Field Number & Special character are not allowed </a><br/>";
        flag = 1;
    } else {
        document.getElementById('placeerr').innerHTML = "";
    }

    var date = document.getElementById('date').value;
    if (date == "") {
        document.getElementById('dateerr').innerHTML = "<a href='#date' style='color:red'>10 Please Enter Date (DD-MM-YYYY)</a><br/>";
        flag = 1;
    } else {
        document.getElementById('dateerr').innerHTML = "";
    }

    var finalsignature = document.getElementById('finalsignature').value;
    if (finalsignature == "") {
        document.getElementById('finalsignatureerr').innerHTML = "<a href='#finalsignature' style='color:red'>10 Please Upload Your Signature</a><br/>";
        flag = 1;
    } else if (!file_regex.exec(finalsignature)) {
        document.getElementById('finalsignatureerr').innerHTML = "<a href='#finalsignature' style='color:red'>Choose Signature in .png/.jpg/.jpeg/.pdf type of format file only</a><br/>";
        flag = 1;
    } else {
        document.getElementById('finalsignatureerr').innerHTML = "";
    }




    if (flag == 1) {
        return false;
    } else {
        document.getElementById('userfname').innerHTML = "";
    }
}