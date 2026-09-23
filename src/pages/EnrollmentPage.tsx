import { useState } from "react";
import { CourseCard } from "@/components/course-card";
import { RegisterDialog } from "@/components/register-dialog";
import { courses, currentStudent, enrollments } from "@/lib/mock-data";

export default function Enrollent() {
  const [myEnrollments, setMyEnrollments] = useState(
    enrollments.filter(
      (enrollment) => enrollment.studentId === currentStudent.studentId,
    ),
  );

  function handleRegister(courseId: string, enrolledAt: string) {
    setMyEnrollments([
      ...myEnrollments,
      {
        studentId: currentStudent.studentId,
        courseId: courseId,
        enrolledAt: enrolledAt,
      },
    ]);
  }

  function handleCancel(courseId: string) {
    setMyEnrollments(
      myEnrollments.filter((enrollment) => enrollment.courseId !== courseId),
    );
  }

  const enrolledCourseIds = myEnrollments.map(
    (enrollment) => enrollment.courseId,
  );

  return (
    <div className="space-y-4">
      {/* แก้ไขส่วน Header ตรงนี้ */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">รายวิชาทั้งหมด</h1>
          <p className="text-sm text-muted-foreground">
            {currentStudent.firstName} {currentStudent.lastName} ({currentStudent.studentId})
          </p>
        </div>

        <RegisterDialog
          courses={courses}
          student={currentStudent}
          enrolledCourseIds={enrolledCourseIds}
          onRegister={handleRegister}
        />
      </div>

      <div className="flex flex-col gap-4">
        {courses.map((course) => {
          const enrollment = myEnrollments.find(
            (item) => item.courseId === course.courseId,
          );
          return (
            <CourseCard
              key={course.courseId}
              course={course}
              student={currentStudent}
              isEnrolled={!!enrollment}
              enrolledAt={enrollment?.enrolledAt}
              onCancle={() => handleCancel(course.courseId)}
            />
          );
        })}
      </div>
    </div>
  );
}
