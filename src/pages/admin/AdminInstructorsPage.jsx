import React, { useState } from "react";
import { FaLinkedin, FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import {
  useEditInstructorPasswordMutation,
  useGetInstructorsQuery,
  useDeleteInstructorMutation,
} from "../../redux/services/instructorsApi";
import Loading from "../../hooks/Loading";
import Error from "../../hooks/Error";
import AddInstructorModal from "../../components/admin/Instructor/AddInstructorModal";
import EditInstructorModal from "../../components/admin/Instructor/EditInstructorModal";
import { FaKey, FaPen, FaTrash } from "react-icons/fa6";
import { LuLoader, LuRefreshCcw, LuX } from "react-icons/lu";

// Password Reset Modal Component


const AdminInstructorsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [fullName, setFullName] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const { data, isLoading, isError, error, isFetching } = useGetInstructorsQuery({
    currentPage,
    fullName,
  });
  console.log(data);

  const instructors = data?.instructors || [];
  const totalPages = data?.pagination?.totalPage;
  const [currentItem, setCurrentItem] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedInstructorId, setSelectedInstructorId] = useState(null);
  const [deleteInstructor, { isLoading: isDeleting }] = useDeleteInstructorMutation();
  const [editInstructorPassword, { isLoading: isEditingPassword }] =
    useEditInstructorPasswordMutation();

  const handleSearch = (e) => {
    if (e.type === "click" || (e.key === "Enter" && e.type === "keydown")) {
      e.preventDefault();
      setFullName(searchInput || "");
      setCurrentPage(1);
    }
  };

  const getPaginationRange = () => {
    if (!data?.pagination?.totalPage) return [];

    const range = [];
    const showPages = 3;
    const totalPages = data?.pagination?.totalPage;
    let start = Math.max(1, currentPage - Math.floor(showPages / 2));
    let end = Math.min(totalPages, start + showPages - 1);

    if (end - start + 1 < showPages) {
      start = Math.max(1, end - showPages + 1);
    }

    if (start > 1) {
      range.push(1);
      if (start > 2) range.push("...");
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) range.push("...");
      range.push(totalPages);
    }

    return range;
  };

  //   const handleDelete = async (productId) => {
  //     const result = await Swal.fire({
  //       title: "Are you sure?",
  //       text: "This action cannot be undone!",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Yes, delete it!",
  //     });

  //     if (result.isConfirmed) {
  //       deletePartner(productId)
  //         .then(() => {
  //           Swal.fire("Deleted!", "Your partner has been deleted.", "success");
  //         })
  //         .catch((error) => {
  //           Swal.fire("Error!", "There was an issue deleting the partner.", {
  //             error,
  //           });
  //         });
  //     }
  //   };

  if (isLoading) return <Loading />;
  if (isError)
    return <Error message={error?.message || "Failed to load instructors"} />;

  return (
    <div className="wrapper-admin relative flex flex-col items-center gap-5 p-8">
      {showAddModal && <AddInstructorModal setShowAddModal={setShowAddModal} />}
      {currentItem && (
        <EditInstructorModal
          setShowEditModal={() => setCurrentItem(null)}
          instructorId={currentItem._id}
          currentInstructor={currentItem}
        />
      )}

      {/* Password Reset Modal */}
      {showPasswordModal && (
        <PasswordResetModal
          onClose={() => setShowPasswordModal(false)}
          instructorId={selectedInstructorId}
          username={instructors.find(i => i._id === selectedInstructorId)?.username || ''}
          editInstructorPassword={editInstructorPassword}
          isEditingPassword={isEditingPassword}
        />
      )}
      <div className="flex justify-between w-full items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-[32px] font-bold text-black">Instructors</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add Instructor
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleSearch}
              className="pl-3 pr-10 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <FaSearch />
            </button>
          </div>
          {fullName && (
            <button
              onClick={() => {
                setSearchInput("");
                setFullName("");
                setCurrentPage(1);
              }}
              className="text-sm px-2 py-1 bg-red-700 rounded-md hover:bg-gray-700 transition"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {!instructors.length ? (
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
          <LuRefreshCcw size={64} className="text-gray-400" />
          <h2 className="text-2xl font-semibold text-gray-600">
            No Instructors Found
          </h2>
          <p className="text-gray-500">No Instructors submitted yet</p>
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black text-white">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">Full Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Username</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {instructors.map((app, index) => (
                <tr key={app._id} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-center">{index + 1}</td>
                  <td className="p-3">
                    {app.firstName} {app.lastName}
                  </td>
                  <td className="p-3">{app.email}</td>
                  <td className="p-3">{app.phone}</td>
                  <td className="p-3">{app.username}</td>
                
                  <td className="p-3 flex justify-center items-center gap-2">
                    {/* <button
                      onClick={() => handleDelete(app._id)}
                      className="bg-gray-200 mx-auto hover:bg-gray-300 rounded p-2"
                    >
                      <FaTrash size={18} className="text-red-600" />
                    </button> */}
                    <button
                      onClick={() => setCurrentItem(app)}
                      className="bg-gray-200 mx-auto hover:bg-gray-300 rounded p-2"
                    >
                      <FaPen size={18} className="text-blue-600" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedInstructorId(app._id);
                        setShowPasswordModal(true);
                      }}
                      className="bg-gray-200 mx-auto hover:bg-gray-300 rounded p-2"
                    >
                      <FaKey size={18} className="text-yellow-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1 || isFetching}
          >
            First
          </button>
          <button
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1 || isFetching}
          >
            Prev
          </button>

          {getPaginationRange().map((page, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded 
                                  ${
                                    page === currentPage
                                      ? "bg-blue-600 text-white"
                                      : page === "..." || isFetching
                                      ? ""
                                      : "bg-gray-200 hover:bg-gray-300"
                                  }`}
              onClick={() => typeof page === "number" && setCurrentPage(page)}
              disabled={page === "..." || isFetching}
            >
              {page}
            </button>
          ))}

          <button
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage >= totalPages || isFetching}
          >
            Next
          </button>
          <button
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
            onClick={() => setCurrentPage(totalPages || 1)}
            disabled={currentPage >= (totalPages || 0) || isFetching}
          >
            Last
          </button>
        </div>
      )}
    </div>
  );
};

const PasswordResetModal = ({ onClose,username , instructorId, editInstructorPassword, isEditingPassword }) => {
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    if (!newPassword) {
      setPasswordError("Password is required");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }

    // Show confirmation dialog
    const result = await Swal.fire({
      title: "Şifrəni dəyişmək istəyirsiniz?",
      text: "Bu əməliyyat geri qaytarıla bilməz!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Bəli, dəyiş!",
      cancelButtonText: "Ləğv et",
    });

    // If confirmed, proceed with password reset
    if (result.isConfirmed) {
      try {
        await editInstructorPassword({
          instructorId: instructorId,
          data: { 
            password: newPassword,
            username: username 
          },
        }).unwrap();

        Swal.fire({
          title: "Uğurlu!",
          text: "Şifrə uğurla dəyişdirildi",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
        onClose();
      } catch (error) {
        console.error("Password reset error:", error);
        Swal.fire({
          title: "Xəta!",
          text: "Şifrə dəyişdirilə bilmədi",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      }
    }
  };

  return (
    <div
      className="addModalContainer"
      data-name="password-modal-container"
      onClick={(e) => {
        e.target.dataset.name && onClose();
      }}
    >
      <div className="addModalForm max-w-md">
        <LuX
          className="closeButton"
          onClick={onClose}
        />
        <h2 className="text-black text-center admin-title text-3xl p-3 mb-5">
          Reset Password
        </h2>
        <form
          onSubmit={handleSubmit}
          className="w-full mt-2 gap-3 flex flex-col"
        >
          <div className="inputContainer">
            <label className="form-label">New Password *</label>
            <input
              className={`form-control ${
                passwordError ? "border-red-500" : ""
              }`}
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setPasswordError("");
              }}
              placeholder="Enter new password"
              required
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          <button
            type="submit"
            className="action-btn mx-auto mt-8 px-4 py-2 flex items-center rounded text-white font-bold gap-2"
            style={{ backgroundColor: "#214440" }}
            disabled={isEditingPassword}
          >
            {isEditingPassword ? (
              <LuLoader className="animate-spin" />
            ) : (
              <>
                Reset Password <FaKey color="white" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminInstructorsPage;
