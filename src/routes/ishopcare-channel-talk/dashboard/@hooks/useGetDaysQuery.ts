import { useQuery } from "@tanstack/react-query";

// fetch(
//   "https://script.google.com/macros/s/AKfycbx6ZibOCfpCdlXUd-5U629k_CjVYKHKY73EU_urM_tCHSfz9fOkTTd7fL4amigVanIC/exec",
// )

const getDays = async () => {
  const res = await fetch(
    "https://script.google.com/macros/s/AKfycbx6ZibOCfpCdlXUd-5U629k_CjVYKHKY73EU_urM_tCHSfz9fOkTTd7fL4amigVanIC/exec",
  );
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await res.json();
  return data;
};
export const useGetDaysQuery = () => {
  return useQuery<
    []
  >({
    queryKey: ["days"],
    queryFn: () => getDays(),
  });
};

