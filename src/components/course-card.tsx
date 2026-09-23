import type { Course, Student } from "@/lib/types";

import { Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
type CourseCardProps = {
  course: Course;
  student: Student;
  isEnrolled: boolean;
  enrolledAt?: string;
  onCancle?: () => void;
};

export function CourseCard({
  course,
  student,
  isEnrolled,
  enrolledAt,
  onCancle,
}: CourseCardProps) {
  const date = enrolledAt
    ? new Intl.DateTimeFormat("th-TH", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date(enrolledAt))
    : "-";

  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle className="text-base">{course.courseTitle}</CardTitle>

        <Badge
          className={
            isEnrolled
              ? "absolute top-4 right-4 bg-amber-100 text-amber-700 dark:bg-purple-900 dark:text-purple-200"
              : "absolute top-4 right-4 bg-purple-100 text-purple-700 dark:bg-amber-900 dark:text-amber-200"
          }
        >
          {isEnrolled ? "ลงทะเบียนแล้ว" : "เปิดรับ"}
        </Badge>

        <CardDescription>
          รหัสวิชา: {course.courseId} · ผู้สอน: {course.instructors.join(", ")}
        </CardDescription>
      </CardHeader>
      {isEnrolled && (
        <CardContent className="flex items-end justify-between">
          <div className="text-xs text-muted-foreground">
            <p>
              ชื่อ นศ.: {student.firstName} {student.lastName}
            </p>
            <p>โปรแกรม: {student.program}</p>
            <p>ลงทะเบียนเมื่อ: {date}</p>
          </div>

          <Button variant="ghost" size="icon" onClick={onCancle}>
            <Trash2 className="text-red-500" />
          </Button>
        </CardContent>
      )}
    </Card>
  );
}
