"use client";
import timeAgo from "@/utils/timeAgo";
import { Loader, OctagonAlert, OctagonX, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Reports = {
  error: boolean | null;
  status: number;
  data: {
    id: string;
    title: string;
    status: number;
    description: string;
    link: string;
    author: string;
    created_at: string;
  }[];
};

const Home = () => {
  const [isReports, setReports] = useState<Reports | null>(null);
  const getReports = async () => {
    const response = await fetch("api/getreport").then((res) => res.json());
    if (response) {
      setReports(response.data);
    } else {
      setReports(null);
    }
  };

  useEffect(() => {
    getReports();
  }, []);

  const useModal = useRef<HTMLDivElement>(null);

  const useTitle = useRef<HTMLInputElement>(null);
  const useLink = useRef<HTMLInputElement>(null);
  const useDesc = useRef<HTMLTextAreaElement>(null);
  const useAuthor = useRef<HTMLInputElement>(null);

  const [isSendReport, setSendReport] = useState<{
    error: boolean;
    isSent: boolean;
  } | null>(null);

  const sendReport = async () => {
    const payload = {
      title: useTitle.current!.value,
      link: useLink.current!.value,
      description: useDesc.current!.value,
      author: useAuthor.current!.value,
    };
    const response = await fetch("api/newreport", {
      method: "POST",
      body: JSON.stringify(payload),
    }).then((res) => res.json());
    setSendReport({
      error: response.error,
      isSent: true,
    });
  };
  return (
    <div className="w-full h-screen flex flex-col gap-3 justify-center items-center">
      <h1 className="text-3xl font-bold">Báo cáo lỗi bài tập azota</h1>
      <span>*Hãy báo cáo rõ ràng, ngắn gọn. Xin cảm ơn!</span>
      <div
        className="absolute top-0 left-0 bg-[#000000f2] w-full h-screen"
        ref={useModal}
        hidden
      >
        <div className="flex flex-col justify-center items-center w-full h-full">
          <div className="w-[500px] flex flex-col border-2 border-dashed border-emerald-500 p-2 rounded">
            <h1 className="flex justify-between items-center px-2 text-2xl font-bold border-b-2 border-dashed py-1 w-full text-center">
              Báo cáo mới
              <button
                className="hover:text-red-400 active:scale-90"
                onClick={() => {
                  useModal.current!.hidden = true;
                }}
              >
                <OctagonX />
              </button>
            </h1>
            <div>
              <div className="p-2">
                <span className="text-[17px] font-semibold">Tiêu đề: </span>
                <input
                  type="text"
                  placeholder="Tiêu đề (ngắn gọn)"
                  className="w-full outline-none border border-white rounded px-2 py-1"
                  ref={useTitle}
                />
              </div>
              <div className="p-2">
                <span className="text-[17px] font-semibold">
                  Link bài lỗi:{" "}
                </span>
                <input
                  type="text"
                  placeholder="Link bài lỗi"
                  className="w-full outline-none border border-white rounded px-2 py-1"
                  ref={useLink}
                />
              </div>
              <div className="p-2">
                <span className="text-[17px] font-semibold">Mô tả: </span>
                <textarea
                  placeholder="Mô tả lỗi (ngắn gọn)"
                  className="w-full outline-none border border-white rounded px-2 py-1"
                  rows={6}
                  ref={useDesc}
                />
              </div>
              <div className="p-2">
                <span className="text-[17px] font-semibold">
                  Người báo cáo:{" "}
                </span>
                <input
                  type="text"
                  placeholder="Tên của bạn"
                  className="w-full outline-none border border-white rounded px-2 py-1"
                  ref={useAuthor}
                />
              </div>
            </div>
            <button
              className="p-2 bg-blue-500 rounded hover:bg-blue-400 active:scale-95"
              onClick={sendReport}
            >
              Gửi 🚀
            </button>
            <span className="text-center py-1">
              {isSendReport?.error
                ? "Có lỗi xảy ra vui lòng thử lại!"
                : isSendReport?.isSent
                ? "Thành công. Vui lòng đợi sửa!"
                : ""}
            </span>
          </div>
        </div>
      </div>
      <div className="border border-emerald-500 border-dashed p-2 rounded flex flex-col justify-center gap-3 w-[500px]">
        <div className="w-full flex justify-center gap-2">
          {/* <input
            placeholder="Tìm kiếm câu bị lỗi"
            className="outline-none border border-white px-2 py-1 rounded w-[300px]"
          /> */}
          <button
            className="p-2 bg-blue-500 rounded hover:bg-blue-400 active:scale-105"
            onClick={() => {
              useModal.current!.hidden = false;
            }}
          >
            Thêm báo cáo
          </button>
        </div>

        {isReports ? (
          <div className="w-full h-[500px] flex flex-col gap-2 overflow-x-hidden overflow-y-scroll scroll">
            {isReports?.data.map((v, i) => (
              <div
                className="flex flex-col w-full p-2 gap-2 border-2 border-dashed border-emerald-500"
                key={i}
              >
                <div className="flex justify-between border-b-2 border-dashed py-1">
                  <h1 className="text-[18px] font-bold">{v.title}</h1>
                  {v.status === 0 ? (
                    <span className="flex gap-1 text-yellow-400">
                      Chờ sửa chữa <OctagonAlert />
                    </span>
                  ) : v.status === 1 ? (
                    <span className="flex gap-1 text-red-400">
                      Từ chối <OctagonX />
                    </span>
                  ) : (
                    <span className="flex gap-1 text-green-400">
                      Đã sửa chữa <ShieldCheck />
                    </span>
                  )}
                </div>
                <div className="text-gray-400 flex flex-col">
                  <span>{v.description}</span>
                  <Link href={v.link} className="underline text-blue-400">
                    Link bài lỗi!
                  </Link>
                </div>
                <div className="flex p-1 justify-between">
                  <span className="text-[14px] text-gray-600">
                    Báo cáo bởi: {v.author}
                  </span>
                  <span className="text-[14px] text-gray-600">
                    {timeAgo(v.created_at as any)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col w-full h-full justify-center items-center">
            <Image
              src={"/loading-azurlane.gif"}
              alt="loading-gif"
              width={128}
              height={128}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
