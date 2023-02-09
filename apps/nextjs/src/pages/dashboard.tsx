import { NextPage } from "next";
import { trpc } from "../utils/trpc";
import NextImage from "next/image";

const Dashboard: NextPage = () => {
  const { data, isLoading } = trpc.user.getUser.useQuery();
  const { data: data2, isLoading: isLoading2 } =
    trpc.user.getUserDirectReports.useQuery();

  if (!data || !data2) return <div>Loading</div>;
  if (isLoading || isLoading2) return <div>Loading...</div>;

  const { firstName, lastName, photo } = data;

  return (
    <div className="container mx-auto max-w-4xl py-2 px-4">
      <div className="flex ">
        {data.photo && photo && (
          <NextImage
            alt={`Profile Photo of ${firstName} ${lastName}`}
            src={`data:${photo.mimeType};base64, ${photo.photo}`}
            height={data.photo.height}
            width={data.photo.width}
            className="rounded-full"
          />
        )}
        <div className="ml-4">
          <h2 className="text-3xl text-gray-700">
            {data.firstName} {data.lastName}
          </h2>
          <h3>{data.jobTitle} </h3>
          <ul>
            <h2 className="text-xs">{data.email} </h2>
          </ul>
        </div>
      </div>
      <div className="mt-7">
        <DirectReports />
      </div>
    </div>
  );
};

export default Dashboard;

const DirectReports = () => {
  const { data, isLoading } = trpc.user.getUserDirectReports.useQuery();

  if (!data) return <div>Loading</div>;
  if (isLoading) return <div>Loading...</div>;

  console.log("data", data);
  return (
    <>
      <h2 className="text-2xl">Direct Reports</h2>
      <div>
        {data.map((user) => (
          <div className="" key={user.email}>
            <div className="flex">
              {user && user.photo && (
                <NextImage
                  alt={`Profile Photo of ${user.firstName} ${user.lastName}`}
                  src={`data:${user.photo.mimeType};base64, ${user.photo.photo}`}
                  height={user.photo.height}
                  width={user.photo.width}
                  className="rounded-full"
                />
              )}
              <h3 className="text-sm">
                {user.firstName} {user.lastName}
              </h3>
              <ul>
                <li className="ml-2 text-sm">{user.jobTitle}</li>
                <li className="ml-2 text-sm">{user.email}</li>
                <li className="ml-2 text-sm">{user.location}</li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
