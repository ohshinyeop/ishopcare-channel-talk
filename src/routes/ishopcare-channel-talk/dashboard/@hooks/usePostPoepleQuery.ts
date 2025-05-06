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

const postPeople = async (data: {
  tag: string;
  count: number;
}[]) => {
  console.log("postPeople", data);
  const res = await fetch(
    "https://script.google.com/macros/s/AKfycbymRirdFon_n0WYZmnmVtaWD-KF_ZJGXH5UrefTtCbE8TuMsmeI_HVZUxyevl5M71pD/exec",
    {
      redirect: "follow",
      method: "POST",
      body: JSON.stringify({
        people: data,
        type: "postPeople"
      }),
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
export const usePostPoepleQuery = () => {

  return useMutation({
    mutationFn: (data: {
      tag: string;
      count: number;
    }[]) => postPeople(data),

  });
};