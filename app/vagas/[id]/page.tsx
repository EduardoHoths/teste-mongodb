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

async function getData(id: string) {
  const res = await fetch(`http://localhost:3000/api/jobs?id=${id}`, {next: {revalidate: 3600}});

  if (!res.ok) throw new Error("Failed to fetch data");

  const data: JobsData = await res.json();

  return data.jobs[0];
}

export default async function JobPage({params}: {params: {id: string}}) {
  const data = getData(params.id);
  const [job] = await Promise.all([data]);
  return (
    <main>
      <h1>{job.title}</h1>

      <strong>{job.amount}</strong>

      <p>{job.city}</p>

      <Link href={'/'}>
        Voltar para vagas
      </Link>
    </main>
  );
}
