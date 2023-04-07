import Home from "@/components/Home";
import { useRouter } from "next/router";

const Room = () => {
  const router = useRouter();
  const { room, username } = router.query;

  return <Home room={room} username={username} />;
};

export default Room;
