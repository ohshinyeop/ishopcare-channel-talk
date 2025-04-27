import { QueryClient, useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";

// fetch(
//   "https://script.google.com/macros/s/AKfycbx6ZibOCfpCdlXUd-5U629k_CjVYKHKY73EU_urM_tCHSfz9fOkTTd7fL4amigVanIC/exec",
// )

// const getDays = async () => {
//   const res = await fetch(
//     "https://script.google.com/macros/s/AKfycbx6ZibOCfpCdlXUd-5U629k_CjVYKHKY73EU_urM_tCHSfz9fOkTTd7fL4amigVanIC/exec",
//   );
//   if (!res.ok) {
//     throw new Error("Network response was not ok");
//   }
//   const data = await res.json();
//   return data;
// };
// export const useGetDaysQuery = () => {
//   return useSuspenseQuery<
//     []
//   >({
//     queryKey: ["days"],
//     queryFn: () => getDays(),
//   });
// };


// fetch(
//   "https://script.google.com/macros/s/AKfycbx6ZibOCfpCdlXUd-5U629k_CjVYKHKY73EU_urM_tCHSfz9fOkTTd7fL4amigVanIC/exec",
//   {
//     redirect: "follow",
//     method: "POST",
//     body: JSON.stringify({
//       date: date,
//       responseCount: dataOfToday?.count,
//     }),
//     headers: {
//       "Content-Type": "text/plain;charset=utf-8",
//     },
//   },

const postDays = async (data: {
  date: Date;
  responseCount: number;
}) => {
  const res = await fetch(
    "https://script.google.com/macros/s/AKfycbx6ZibOCfpCdlXUd-5U629k_CjVYKHKY73EU_urM_tCHSfz9fOkTTd7fL4amigVanIC/exec",
    {
      redirect: "follow",
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    },
  );
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return res;
}
export const usePostDaysQuery = () => {

  return useMutation({
    mutationFn: (data: {
      date: Date;
      responseCount: number;
    }) => postDays(data),

  });
};