import Home from "@/components/Home";
import { useRouter } from "next/router";

const Room = () => {
  const router = useRouter();
  const { value } = router.query;
  const decodedValues = value ? atob(value) : null;
  // const [username, room] = decodedValues ? decodedValues.split("|") : [];
  const room = decodedValues;
  return <Home room={room} />;
};

export default Room;
