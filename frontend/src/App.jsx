import "./App.css";
import { Route, Routes } from "react-router-dom";
import PublicLayout from "./_public/PublicLayout";
import AdminLayout from "./_admin/AdminLayout";
import AuthLayout from "./_auth/AuthLayout";
import { Home, Result } from "./_public/pages";
import AdminLoginForm from "./_auth/forms/AdminLoginForm";
import AdminRegisterForm from "./_auth/forms/AdminRegisterForm";
import {
    AddResult,
    AdminHome,
    AdminResult,
    Class,
    Exam,
    NewStudent,
    Payment,
    SingleExam,
    SinglePayment,
    SingleStudent,
    Student,
} from "./_admin/pages";

function App() {
    return (
        <>
            <main>
                <Routes>
                    {/* Public Routes */}
                    <Route element={<PublicLayout />}>
                        <Route index element={<Home />} />
                        <Route path="/result" element={<Result />} />
                    </Route>

                    {/* Auth Routes */}
                    <Route path="/auth" element={<AuthLayout />}>
                        <Route
                            path="admin-login"
                            element={<AdminLoginForm />}
                        />
                        <Route
                            path="admin-register"
                            element={<AdminRegisterForm />}
                        />
                    </Route>

                    {/* Admin Routes  */}
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<AdminHome />} />

                        <Route path="class" element={<Class />} />

                        <Route path="exam" element={<Exam />} />
                        <Route path="exam/:examId" element={<SingleExam />} />

                        <Route path="student" element={<Student />} />
                        <Route path="student/new" element={<NewStudent />} />
                        <Route
                            path="student/:studentId"
                            element={<SingleStudent />}
                        />

                        <Route path="result" element={<AdminResult />} />
                        <Route path="result/new" element={<AddResult />} />

                        <Route path="payment" element={<Payment />} />
                        <Route
                            path="payment/:paymentId"
                            element={<SinglePayment />}
                        />
                    </Route>
                </Routes>
            </main>
        </>
    );
}

export default App;
