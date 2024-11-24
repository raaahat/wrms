"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Clock, MapPin, Wrench, AlertTriangle, Zap, Activity, ArrowUpRight, ArrowDownRight, User, FileText, Users } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"

type WorkRequest = {
  id: string
  wrNo: string
  title: string
  type: "ELECTRICAL" | "MECHANICAL"
  status: "PLACED" | "PENDING" | "ONGOING" | "FINISHED" | "DONE" | "UNDER_OBSERVATION" | "NOT_SOLVED" | "FOLLOW_UP"
  maintEngr?: { id: string; name: string; imageUrl: string; designation: string; department: string }
  workStartedAt?: Date
  workFinishConfrimedAt?: Date
  remarks?: string
  mode: "NORMAL" | "STRICT"
  runningHour?: string
  referredFromId?: string
  referredToId?: string
  creator: { id: string; name: string; imageUrl: string; designation: string; department: string }
  area: { id: string; name: string }
  createdAt: Date
  updatedAt: Date
}

type WorkRequestModalProps = {
  workRequest: WorkRequest
}

export function WorkRequestModalCompact({ workRequest }: WorkRequestModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  const getStatusColor = (status: WorkRequest["status"]) => {
    const colors: Record<WorkRequest["status"], string> = {
      PLACED: "bg-blue-500",
      PENDING: "bg-yellow-500",
      ONGOING: "bg-purple-500",
      FINISHED: "bg-green-500",
      DONE: "bg-green-700",
      UNDER_OBSERVATION: "bg-orange-500",
      NOT_SOLVED: "bg-red-500",
      FOLLOW_UP: "bg-indigo-500",
    }
    return colors[status]
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-gradient-to-r from-green-500 to-teal-500 text-white border-none text-sm">
          View Work Request (Compact)
        </Button>
      </DialogTrigger>
      <AnimatePresence>
        {isOpen && (
          <DialogContent forceMount className="max-w-3xl p-0 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="h-[80vh] flex flex-col"
            >
              <DialogHeader className="p-6 pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <DialogTitle className="text-2xl font-bold text-gray-800 mb-2">
                      {workRequest.title}
                    </DialogTitle>
                    <p className="text-sm text-gray-600">WR No: {workRequest.wrNo}</p>
                  </div>
                  <Badge className={`${getStatusColor(workRequest.status)} text-white px-2 py-1 text-xs font-medium`}>
                    {workRequest.status}
                  </Badge>
                </div>
              </DialogHeader>
              <ScrollArea className="flex-1 p-6">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Clock className="w-4 h-4" /> Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p><span className="font-medium">Created:</span> {format(workRequest.createdAt, "PPpp")}</p>
                      <p><span className="font-medium">Area:</span> {workRequest.area.name}</p>
                      <p><span className="font-medium">Type:</span> {workRequest.type}</p>
                      <p><span className="font-medium">Mode:</span> {workRequest.mode}</p>
                      {workRequest.runningHour && (
                        <p><span className="font-medium">Running Hour:</span> {workRequest.runningHour}</p>
                      )}
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Users className="w-4 h-4
" /> People
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <EmployeeInfo title="Creator" employee={workRequest.creator} />
                      {workRequest.maintEngr && (
                        <EmployeeInfo title="Maintenance Engineer" employee={workRequest.maintEngr} />
                      )}
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Activity className="w-4 h-4" /> Timeline
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-1">
                      <p><span className="font-medium">Created:</span> {format(workRequest.createdAt, "PPpp")}</p>
                      {workRequest.workStartedAt && (
                        <p><span className="font-medium">Work Started:</span> {format(workRequest.workStartedAt, "PPpp")}</p>
                      )}
                      {workRequest.workFinishConfrimedAt && (
                        <p><span className="font-medium">Work Finished:</span> {format(workRequest.workFinishConfrimedAt, "PPpp")}</p>
                      )}
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <FileText className="w-4 h-4" /> Remarks & References
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      {workRequest.remarks ? (
                        <p className="mb-2">{workRequest.remarks}</p>
                      ) : (
                        <p className="text-gray-500 italic mb-2">No remarks available.</p>
                      )}
                      {workRequest.referredFromId && (
                        <p><span className="font-medium">Referred From:</span> {workRequest.referredFromId}</p>
                      )}
                      {workRequest.referredToId && (
                        <p><span className="font-medium">Referred To:</span> {workRequest.referredToId}</p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </ScrollArea>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  )
}

function EmployeeInfo({ title, employee }: { title: string; employee: WorkRequest["creator"] | WorkRequest["maintEngr"] }) {
  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={employee.imageUrl} alt={employee.name} />
        <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
      </Avatar>
      <div>
        <p className="font-medium text-sm">{employee.name}</p>
        <p className="text-xs text-gray-500">{title}</p>
      </div>
    </div>
  )
}

