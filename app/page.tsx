import Link from "next/link";

interface Job {
  _id: string;
  title: string;
  amount: number;
  description: string;
  city: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

interface JobsData {
  jobs: Job[];
}

async function getData() {
  const res = await fetch("http://localhost:3000/api/jobs", {next: {revalidate: 3600}});

  if (!res.ok) throw new Error("Failed to fetch data");

  const data: JobsData = await res.json();

  return data.jobs;
}

export default async function Home() {
  const data = getData();
  const [jobs] = await Promise.all([data]);

  return (
    <main>
      <div className="flex gap-5 mt-10 items-center justify-center w-full">
        {jobs.map((job: Job) => (
          <div key={job._id} className="border p-4 flex flex-col gap-4">
            <h1> {job.title}</h1>
            <strong>{job.amount}</strong>
            <Link href={`/vagas/${job._id}`} className="block">
              Visualizar a vaga
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
