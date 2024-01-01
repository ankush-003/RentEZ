import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import NotificationCard from "@/components/NotificationCard";
import { Announcement } from "@/types/Announcements";
import { Visitor } from "@/types/Visitor";
import VisitorCard from "@/components/VisitorCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import AuthButton from "@/components/AuthButton";

export default async function AnnouncementPage() {
  // const announcements = await getNotifications();
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  let { data: {session} } = await supabase.auth.getSession();
  let { data, error } = await supabase.from("announcement").select("*");
  let announcements = data;
  const getVisitors = async (id: string | undefined): Promise<Visitor[] | null> => {
    const { data, error } = await supabase
      .rpc("get_owner_visitors", { owner_id: id })
      .select("*");
    return data;
  }
  let visitors = await getVisitors(session?.user?.id);

  return (
    <>
      <Breadcrumb pageName="Home" >
        <AuthButton />
        </Breadcrumb>
      <Tabs defaultValue="announcements" className="space-y-4">
        <TabsList>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="visitors">Visitors</TabsTrigger>
        </TabsList>
        <TabsContent value="announcements" className="mx-auto space-y-4 ">
          <NotificationCard notifications={announcements} />
        </TabsContent>
        <TabsContent value="visitors" className="mx-auto space-y-4">
          <VisitorCard visitors={visitors?visitors:[]} />
        </TabsContent>
      </Tabs>
    </>
  );
}
