import { useState } from "react";
import Swal from "sweetalert2";
import { useClientSignUp } from "../../../hooks/authClient/useClientSignUp";

const ClientSignUp = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [contactMethod, setContactMethod] = useState("");
  const [verificationMethod, setVerificationMethod] = useState("");
  const [contact, setContact] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [shake, setShake] = useState(false);

  const [signUpMethod, setSignUpMethod] = useState(false);
  const [mobileMethod, setMobileMethod] = useState(false);

  const [token, setToken] = useState('');
  const { step1, step2, step3, loading, error } = useClientSignUp();

  const formatPhoneNumber = (value) => {
    // Remove any non-digit characters
    const digits = value.replace(/\D/g, "");

    // Take only the first 9 digits
    const limitedDigits = digits.slice(0, 9);

    // Format the phone number
    let formatted = "";
    if (limitedDigits.length > 0) {
      if (limitedDigits.length >= 2)
        formatted += limitedDigits.slice(0, 2) + " ";
      if (limitedDigits.length >= 5)
        formatted += limitedDigits.slice(2, 5) + " ";
      if (limitedDigits.length >= 7)
        formatted += limitedDigits.slice(5, 7) + " ";
      if (limitedDigits.length >= 9) formatted += limitedDigits.slice(7, 9);
      return formatted.trim();
    }
    return "";
  };

  const handlePhoneChange = (e) => {
    const input = e.target.value;
    const digits = input.replace(/\D/g, "");
    if (digits.length <= 9) {
      setPhoneNumber(digits);
      setContact("+994 " + formatPhoneNumber(digits));
    }
  };

  const showAlert = (config) => {
    return Swal.fire({
      ...config,
      showConfirmButton: config.showConfirmButton ?? true,
      position: "center",
      customClass: {
        popup: "animate-scaleIn",
      },
    });
  };

  const handleContactMethodChange = (method) => {
    setContactMethod(method);
    setContact("");
    setPhoneNumber("");
    setErrors({});
    setSignUpMethod(true);
  };

  const handleVerificationMethodChange = (method) => {
    setVerificationMethod(method);
    setErrors({});
    setMobileMethod(true);
  };

  const handleContactChange = (e) => {
    if (contactMethod === "mobile") {
      handlePhoneChange(e);
    } else {
      setContact(e.target.value);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.querySelector(
          `input[name="otp-${index + 1}"]`
        );
        nextInput?.focus();
      }
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.querySelector(
        `input[name="otp-${index - 1}"]`
      );
      prevInput?.focus();
    }
  };

  const validateContactStep = () => {
    const newErrors = {};
    if (!contactMethod) {
      newErrors.contactMethod = "Please select a contact method";
    } else if (contactMethod === "email") {
      if (!contact) {
        newErrors.contact = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(contact)) {
        newErrors.contact = "Please enter a valid email";
      }
    } else if (contactMethod === "mobile") {
      if (!verificationMethod) {
        newErrors.verificationMethod = "Please select a verification method";
      }
      if (!phoneNumber || phoneNumber.length !== 9) {
        newErrors.contact = "Please enter a valid 9-digit phone number";
      }
    }
    return newErrors;
  };

  const validateOtpStep = () => {
    const newErrors = {};
    if (otp.some((digit) => !digit)) {
      newErrors.otp = "Please enter the complete verification code";
    }
    return newErrors;
  };

  const validateRegistrationStep = () => {
    const newErrors = {};
    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName) {
      newErrors.lastName = "last name is required";
    }
    if (!formData.birthDate) {
      newErrors.birthDate = "Birth date is required";
    }
    if (!formData.gender) {
      newErrors.gender = "Please select your gender";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    return newErrors;
  };

  const handleContinue = async () => {
    let newErrors = {};
    if (step === 1) newErrors = validateContactStep();
    else if (step === 2) newErrors = validateOtpStep();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setShake(true);
      setTimeout(() => setShake(false), 650);
      return;
    }

    try {
      if (step === 1) {
        const type = contactMethod === 'email' ? 'email' : 'phone';
        const contactValue = contactMethod === 'email' 
          ? contact 
          : `+994${phoneNumber}`;  //Nomredirse nomre deilse email gonderilir
        
        await step1(contactValue); // 1-Email ve ya nomrenin valuesi , 2-inputun typesi(email ya da phone)
        setStep(prev => prev + 1);
      } else if (step === 2) {
        const type = contactMethod === 'email' ? 'email' : 'phone';
        const contactValue = contactMethod === 'email' 
          ? contact 
          : `+994${phoneNumber}`;
        
        const response = await step2(contactValue, otp.join(''), type);
        setToken(response.token); // Assuming token is returned in response
        setStep(prev => prev + 1);
      }
    } catch (error) {
      showAlert({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to proceed",
      });
    }
  };

  const handleSubmit = async () => {
    const newErrors = validateRegistrationStep();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setShake(true);
      setTimeout(() => setShake(false), 650);
      return;
    }

    try {
      const registrationData = {
        firstName: formData.firstName,
        lastName: formData.lastName, 
        birthDate: new Date(formData.birthDate),
        gender: formData.gender,
        password: formData.password,
      };

      await step3(registrationData, token);
      
      await showAlert({
        icon: "success",
        title: "Success!",
        text: "Registration completed successfully",
        timer: 2000,
      });

      onClose();
    } catch (error) {
      showAlert({
        icon: "error",
        title: "Registration Failed",
        text: error.message || "An error occurred during registration",
      });
    }
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="pb-5">
        <h1 className="text-center mb-3 text-[28px] font-[600] text-[#0C0C0C]">
          Qeydiyyat
        </h1>
        <h3 className="text-[14px] text-center font-[400] text-[#737373]">
          Choose your preferred sign-up method: Email or Phone. Get started
          easily and securely!
        </h3>
      </div>
      {errors.contactMethod && (
        <p className={`text-sm text-red-500 ${shake ? "animate-shake" : ""}`}>
          {errors.contactMethod}
        </p>
      )}
      {!signUpMethod && (
        <div className="grid grid-cols-1 gap-4">
          <button
            type="button"
            onClick={() => handleContactMethodChange("email")}
            className={`p-4 text-center bg-[#0C0C0C] text-white hover:bg-[#0c0c0cd6] transition-colors duration-200  ${
              errors.contactMethod && shake ? "animate-shake" : ""
            }`}
          >
            Email
          </button>
          {/* <button
            type="button"
            onClick={() => handleContactMethodChange("mobile")}
            className={`p-4 text-center bg-[#0C0C0C] text-white hover:bg-[#0c0c0cd6] transition-colors duration-200 
             ${errors.contactMethod && shake ? "animate-shake" : ""}`}
          >
            Mobile
          </button> */}
        </div>
      )}

      {contactMethod && (
        <div className="space-y-4">
          {contactMethod === "email" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={contact}
                onChange={handleContactChange}
                placeholder="Enter your email"
                className={`mt-1 block w-full px-3 py-3 border rounded-[4px]  ${
                  errors.contact ? "border-red-500" : "border-gray-300"
                } ${errors.contact && shake ? "animate-shake" : ""}`}
              />
              {errors.contact && (
                <p
                  className={`mt-1 text-sm text-red-500 ${
                    shake ? "animate-shake" : ""
                  }`}
                >
                  {errors.contact}
                </p>
              )}
            </div>
          )}

          {contactMethod === "mobile" && !mobileMethod && (
            <div className="space-y-4">
              <div>
                <div
                  className={`mt-2 grid grid-cols-1 gap-4 ${
                    errors.verificationMethod && shake ? "animate-shake" : ""
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleVerificationMethodChange("sms")}
                    className="p-4 text-center bg-[#0C0C0C] text-white hover:bg-[#0c0c0cd6] transition-colors duration-200"
                  >
                    SMS
                  </button>
                  <button
                    type="button"
                    onClick={() => handleVerificationMethodChange("whatsapp")}
                    className="p-4 text-center bg-[#0C0C0C] text-white hover:bg-[#0c0c0cd6] transition-colors duration-200"
                  >
                    WhatsApp
                  </button>
                </div>
                {errors.verificationMethod && (
                  <p
                    className={`mt-1 text-sm text-red-500 ${
                      shake ? "animate-shake" : ""
                    }`}
                  >
                    {errors.verificationMethod}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {verificationMethod && (
        <div className="PhoneNumber">
          <label className="block text-sm font-medium text-[#0C0C0C]">
            Phone Number
          </label>
          <div
            className={`flex mt-1 ${
              errors.contact && shake ? "animate-shake" : ""
            }`}
          >
            <span className="inline-flex items-center px-3 py-2 text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
              +994
            </span>
            <input
              type="text"
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder="50 555 55 55"
              className={`flex-1 block w-full px-3 py-2 border rounded-r-md  ${
                errors.contact ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
          {errors.contact && (
            <p
              className={`mt-1 text-sm text-red-500 ${
                shake ? "animate-shake" : ""
              }`}
            >
              {errors.contact}
            </p>
          )}
        </div>
      )}

      {((contactMethod === "email" ) ||
        (contactMethod === "mobile" && verificationMethod )) && (
        <button
          type="button"
          onClick={handleContinue}
          className="p-4 w-full text-center bg-[#0C0C0C] text-white hover:bg-[#0c0c0cd6] transition-colors duration-200"
        >
          Continue
        </button>
      )}
    </div>
  );

  const renderStep2Otp = () => (
    <div className="space-y-3">
      <h3 className="text-[28px] font-semibold text-center text-gray-900">
        Təsdiq kodu
      </h3>
      <p className="text-[14px] text-center font-[500] text-[#737373]">
        Enter the 4 Digit code sent to{" "}
        {contactMethod === "email" ? "your email" : "your phone number"}
      </p>
      {errors.otp && (
        <p
          className={`text-sm text-center text-red-500 ${
            shake ? "animate-shake" : ""
          }`}
        >
          {errors.otp}
        </p>
      )}

      <div className="flex w-full justify-between gap-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            name={`otp-${index}`}
            maxLength={1}
            value={digit}
            onChange={(e) => handleOtpChange(index, e.target.value)}
            onKeyDown={(e) => handleOtpKeyDown(index, e)}
            required
            className={`w-[80px] h-[80px] text-center border border-gray-300 rounded-md shadow-sm  transition-colors duration-200 ${
              errors.otp && shake ? "animate-shake" : ""
            }`}
          />
        ))}
      </div>
      <div className="text-[14px] py-4 text-center font-[500] text-[#737373]">
        <p>Didn&apos;t receive the code?</p>
        <p>
          <span className="font-bold text-[#0C0C0C]">Resend code in</span> in
          00:54
        </p>
      </div>
      <button
        type="button"
        onClick={handleContinue}
        className="p-4 w-full text-center bg-[#0C0C0C] text-white hover:bg-[#0c0c0cd6] transition-colors duration-200"
      >
        Submit
      </button>
    </div>
  );

  const renderStep3RegistrationForm = () => (
    <div className="space-y-4">
      <div className="mb-4">
        <h1 className="text-center mb-2 text-[28px] font-[600] text-[#0C0C0C]">
          Qeydiyyat
        </h1>
        <h3 className="text-[14px] text-center font-[400] text-[#737373]">
          Choose your preferred sign-up method: Email or Phone. Get started
          easily and securely!
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#0C0C0C]">
            Ad{" "}
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={(e) => {
              const { name, value } = e.target;
              setFormData((prev) => ({ ...prev, [name]: value }));
              if (errors[name]) {
                setErrors((prev) => ({ ...prev, [name]: "" }));
              }
            }}
            placeholder="Ad"
            required
            className={`mt-1 block w-full px-3 py-3 border rounded-md shadow-sm transition-colors duration-200 ${
              errors.firstName ? "border-red-500" : "border-gray-300"
            } ${errors.firstName && shake ? "animate-shake" : ""}`}
          />
          {errors.firstName && (
            <p
              className={`mt-1 text-sm text-red-500 ${
                shake ? "animate-shake" : ""
              }`}
            >
              {errors.firstName}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-[#0C0C0C]">
            Soyad
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={(e) => {
              const { name, value } = e.target;
              setFormData((prev) => ({ ...prev, [name]: value }));
              if (errors[name]) {
                setErrors((prev) => ({ ...prev, [name]: "" }));
              }
            }}
            placeholder="Soyad"
            required
            className={`mt-1 block w-full px-3 py-3 border rounded-md shadow-sm transition-colors duration-200 ${
              errors.lastName ? "border-red-500" : "border-gray-300"
            } ${errors.lastName && shake ? "animate-shake" : ""}`}
          />
          {errors.lastName && (
            <p
              className={`mt-1 text-sm text-red-500 ${
                shake ? "animate-shake" : ""
              }`}
            >
              {errors.lastName}
            </p>
          )}
        </div>
      </div>

 

      <div>
        <label className="block text-sm font-medium text-gray-700">Cins</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={(e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
            if (errors[name]) {
              setErrors((prev) => ({ ...prev, [name]: "" }));
            }
          }}
          required
          className={`mt-1 block text-gray-700 w-full px-3 py-3 border rounded-md shadow-sm transition-colors duration-200 ${
            errors.gender ? "border-red-500" : "border-gray-300"
          } ${errors.gender && shake ? "animate-shake" : ""}`}
        >
          <option className="" value="">
            Cinsiyyətinizi seçin
          </option>
          <option value="female">Qadın</option>
          <option value="male">Kişi</option>
        </select>
        {errors.gender && (
          <p
            className={`mt-1 text-sm text-red-500 ${
              shake ? "animate-shake" : ""
            }`}
          >
            {errors.gender}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Dogum tarixi
        </label>
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={(e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
            if (errors[name]) {
              setErrors((prev) => ({ ...prev, [name]: "" }));
            }
          }}
          required
          className={`mt-1 block w-full px-3 py-3 border rounded-md shadow-sm transition-colors duration-200 ${
            errors.birthDate ? "border-red-500" : "border-gray-300"
          } ${errors.birthDate && shake ? "animate-shake" : ""}`}
        />
        {errors.birthDate && (
          <p
            className={`mt-1 text-sm text-red-500 ${
              shake ? "animate-shake" : ""
            }`}
          >
            {errors.birthDate}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Şifrə</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={(e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
            if (errors[name]) {
              setErrors((prev) => ({ ...prev, [name]: "" }));
            }
          }}
          required
          className={`mt-1 block w-full px-3 py-3 border rounded-md shadow-sm transition-colors duration-200 ${
            errors.password ? "border-red-500" : "border-gray-300"
          } ${errors.password && shake ? "animate-shake" : ""}`}
        />
        {errors.password && (
          <p
            className={`mt-1 text-sm text-red-500 ${
              shake ? "animate-shake" : ""
            }`}
          >
            {errors.password}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Şifrəni Təkrarla
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={(e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
            if (errors[name]) {
              setErrors((prev) => ({ ...prev, [name]: "" }));
            }
          }}
          required
          className={`mt-1 block w-full px-3 py-3 border rounded-md shadow-sm transition-colors duration-200 ${
            errors.confirmPassword ? "border-red-500" : "border-gray-300"
          } ${errors.confirmPassword && shake ? "animate-shake" : ""}`}
        />
        {errors.confirmPassword && (
          <p
            className={`mt-1 text-sm text-red-500 ${
              shake ? "animate-shake" : ""
            }`}
          >
            {errors.confirmPassword}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        className="p-4 w-full text-center bg-[#0C0C0C] text-white hover:bg-[#0c0c0cd6] transition-colors duration-200"
        >
        Qeydiyyatdan keçin
      </button>
    </div>
  );

  if (loading)
    return (
      <div className="loader-container w-full h-full flex justify-center items-center gap-3">
    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  // if (error)
  //   return <div className="text-red-500 p-8 text-center my-auto">Error</div>;

  return (
    <div className="space-y-6">
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2Otp()}
      {step === 3 && renderStep3RegistrationForm()}
    </div>
  );
};

export default ClientSignUp;
