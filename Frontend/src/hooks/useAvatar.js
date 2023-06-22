import { useEffect, useState } from "react";
import useServer from "./useServer";
import useGetTokenValues from "./useGetTokenValues";

function useAvatar(id) {
  console.log(id);
  console.log(typeof id);
  const [avatar, setAvatar] = useState([]);
  const { get } = useServer();
  const token = useGetTokenValues();

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const { data } = await get({ url: `/user/1`, body: token });
        console.log(data);
        setAvatar(data);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchAvatar();
  }, []);

  return avatar;
}

export default useAvatar;
