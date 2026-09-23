import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center gap-6 pt-12">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle className="text-lg">
            ระบบลงทะเบียนเรียน CPE & ISNE
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button render={<Link to="/enrollment" />}>
            ไปหน้าลงทะเบียนเรียน
          </Button>
        </CardContent>
      </Card>

      <p className="text-sm text-muted-foreground">
        จัดทำโดย Kanchanok Trakankasikit รหัสนักศึกษา 670610870
      </p>
    </div>
  );
}