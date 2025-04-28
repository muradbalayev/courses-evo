import React, { useState } from "react";
import Swal from "sweetalert2";
import { useAddInstructorMutation } from "../../../redux/services/instructorsApi";
import { LuLoader, LuUsers, LuX } from "react-icons/lu";

const AddInstructorModal = ({ setShowAddModal }) => {
  const [addInstructor, { isLoading: instructorLoading }] = useAddInstructorMutation();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    address: "",  
    phone: "",
    email: "",
    username: "",
    password: "",
  });

  const handleBaseChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const validationSchema = {
    firstName: (value) => !value && "Please enter a first name",
    lastName: (value) => !value && "Please enter a last name",
    address: (value) => !value && "Please enter an address",
    phone: (value) => !value && "Please enter a phone number",
    email: (value) => {
      if (!value) return "Please enter an email";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "Please enter a valid email";
      return null;
    },
    username: (value) => !value && "Please enter an username",
    password: (value) => !value || value.length < 6 && "Please enter a password with at least 6 characters",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    for (const [field, validateField] of Object.entries(validationSchema)) {
      const errorMessage = validateField(data[field]);
      if (errorMessage) {
        Swal.fire({
          title: "Xəta!",
          text: errorMessage,
          icon: "error",
          confirmButtonColor: "#d33",
        });
        return;
      }
    }

    // Show confirmation dialog
    const result = await Swal.fire({
      title: "Tərəfdaş əlavə etmək istəyirsiniz?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Bəli, əlavə et!",
      cancelButtonText: "Ləğv et",
    });

    // If confirmed, proceed with instructor creation
    if (result.isConfirmed) {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("address", data.address);
      formData.append("phone", data.phone);
      formData.append("email", data.email);
      formData.append("username", data.username);
      formData.append("password", data.password);
      try {
        await addInstructor(formData).unwrap();
        Swal.fire({
          title: "Uğurlu!",
          text: "Tərəfdaş uğurla yaradıldı",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
        setShowAddModal(false);
      } catch (error) {
        console.error("Instructor creation error:", error);
        Swal.fire({
          title: "Xəta!",
          text: "Tərəfdaş yaradıla bilmədi",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      }
    }
  };

  return (
    <div
      className="addModalContainer"
      data-name="form-container"
      onClick={(e) => {
        e.target.dataset.name && setShowAddModal(false);
      }}
    >
      <form className="addModalForm" onSubmit={handleSubmit}>
        <LuX className="closeButton" onClick={() => setShowAddModal(false)} />
        <h2 className="text-black text-center admin-title text-3xl p-3 mb-5">
          Add Instructor
        </h2>
        <div className="w-full mt-2 gap-3 flex flex-col">
          {/* Basic Info Section */}
          <div className="w-full flex inputRow gap-5 justify-between">
            <div className="inputContainer">
              <label className="form-label">First Name *</label>
              <input
                className="form-control"
                type="text"
                name="firstName"
                value={data.firstName}
                onChange={handleBaseChange}
                required
              />
            </div>

            <div className="inputContainer">
              <label className="form-label">Last Name *</label>
              <input
                className="form-control"
                type="text"
                name="lastName"
                value={data.lastName}
                onChange={handleBaseChange}
                required
              />
            </div>
          </div>

          <div className="w-full flex inputRow gap-5 justify-between">
            <div className="inputContainer">
              <label className="form-label">Address *</label>
              <input
                className="form-control"
                type="text"
                name="address"
                value={data.address}
                onChange={handleBaseChange}
                required
              />
            </div>

            <div className="inputContainer">
              <label className="form-label">Phone *</label>
              <input
                className="form-control"
                type="tel"
                name="phone"
                value={data.phone}
                onChange={handleBaseChange}
                placeholder="+1234567890"
                required
              />
            </div>
          </div>

          <div className="w-full flex inputRow gap-5 justify-between">
            <div className="inputContainer">
              <label className="form-label">Email *</label>
              <input
                className="form-control"
                type="email"
                name="email"
                value={data.email}
                onChange={handleBaseChange}
                placeholder="example@email.com"
                required
              />
            </div>

            <div className="inputContainer">
              <label className="form-label">Username *</label>
              <input
                className="form-control"
                type="text"
                name="username"
                value={data.username}
                onChange={handleBaseChange}
                placeholder="@username"
                required
              />
            </div>

           
          </div>
          <div className="w-full flex inputRow gap-5 justify-between">
          <div className="inputContainer">
              <label className="form-label">Password *</label>
              <input
                className="form-control"
                type="text"
                name="password"
                value={data.password}
                onChange={handleBaseChange}
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

        </div>
        <button
          type="submit"
          className="action-btn mx-auto mt-8 px-4 py-2 flex items-center rounded text-white font-bold gap-2"
          style={{ backgroundColor: "#214440" }}
          disabled={instructorLoading}
        >
          {instructorLoading ? (
            <LuLoader className="animate-spin" />
          ) : (
            <>
              Create Instructor <LuUsers color="white" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddInstructorModal;
