import Home from "@/components/Home";
import { useRouter } from "next/router";

export default function Room() {
  const router = useRouter();
  const { username, room } = router.query;

  return <Home username={username} room={room} />;
}
