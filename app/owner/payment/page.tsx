import { promises as fs } from "fs"
import path from "path"
import { z } from "zod"
import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { PSchema } from "./data/schema"



// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "/app/owner/payment/data/payments.json")
  )

  const tasks = JSON.parse(data.toString())

  return z.array(PSchema).parse(tasks)
}

export default async function TaskPage() {
  const tasks = await getTasks()

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Payment History</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of Payments!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            
          </div>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  )
}