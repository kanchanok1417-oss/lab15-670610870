import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { Course, Student } from "@/lib/types";

type RegisterDialogProps = {
  courses: Course[];
  student?: Student; 
  enrolledCourseIds: string[];
  onRegister: (courseId: string, enrolledAt: string) => void;
};

export function RegisterDialog({
  courses = [],           
  student,
  enrolledCourseIds = [],  
  onRegister,
}: RegisterDialogProps) {
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");
  const time = new Date().toTimeString().slice(0, 5);

  const availableCourses = (courses || []).filter(
    (course) => !(enrolledCourseIds || []).includes(course.courseId),
  );

  const studentName = student
    ? `${student.firstName ?? ""} ${student.lastName ?? ""}`.trim() ||
      (student as any).name ||
      ""
    : "";

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const now = new Date();
    const [hour, minute] = time.split(":");
    now.setHours(Number(hour));
    now.setMinutes(Number(minute));
    onRegister(courseId, now.toISOString());
    setCourseId("");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* ✅ ลบ asChild ออกแล้ว[cite: 2] */}
      <DialogTrigger>
        <Button>ลงทะเบียน</Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>ลงทะเบียนเรียน</DialogTitle>
            <DialogDescription>
              เลือกวิชาที่ต้องการลงทะเบียน แล้วกรอกข้อมูลให้ครบ
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label>วิชา</Label>

            <Select
              value={courseId}
              onValueChange={(value) => setCourseId(value ?? "")}
            >
              <SelectTrigger>
                <SelectValue placeholder="เลือกวิชา" />
              </SelectTrigger>

              <SelectContent>
                {availableCourses.map((course) => (
                  <SelectItem key={course.courseId} value={course.courseId}>
                    {course.courseId} - {course.courseTitle}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">เวลา</Label>
            <Input id="time" type="time" defaultValue={time} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="studentName">ชื่อ นศ.</Label>
            <Input
              id="studentName"
              value={studentName}
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="program">โปรแกรม</Label>
            <Input id="program" value={student?.program ?? ""} readOnly />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={!courseId}>
              ยืนยันการลงทะเบียน
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
