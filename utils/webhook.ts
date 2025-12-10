export default async function sendWebHook({
  title,
  description,
  link,
  author,
}: {
  title: string;
  description: string;
  link: string;
  author: string;
}) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_WEBHOOK_DISCORD as string,
    {
      method: "POST",
      body: JSON.stringify({
        content: null,
        embeds: [
          {
            title: title,
            description: description,
            color: 5814783,
            fields: [
              {
                name: "Azota",
                value: link,
              },
            ],
            footer: { text: `Báo cáo bởi: ${author}` },
          },
        ],
        attachments: [],
      }),
      headers: {
        "content-type": "application/json",
      },
    }
  ).then((res) => res.json());
  console.log(response);
  if (!response.channel_id) {
    console.error("Có lỗi khi gửi webhook!");
  }
}
