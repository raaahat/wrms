"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

export function WorkRequestModalTabbed({ workRequest }: WorkRequestModalProps) {
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
        <Button variant="outline" className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-none text-sm">
          View Work Request (Tabbed)
        </Button>
      </DialogTrigger>
      <AnimatePresence>
        {isOpen && (
          <DialogContent forceMount className="max-w-4xl p-0 overflow-hidden">
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
              <Tabs defaultValue="details" className="flex-1 overflow-hidden">
                <TabsList className="px-6">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="people">People</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  <TabsTrigger value="remarks">Remarks</TabsTrigger>
                </TabsList>
                <ScrollArea className="flex-1 p-6">
                  <TabsContent value="details" className="mt-0">
                    <Card>
                      <CardContent className="p-6 space-y-4">
                        <InfoItem icon={Clock} label="Created" value={format(workRequest.createdAt, "PPpp")} />
                        <InfoItem icon={MapPin} label="Area" value={workRequest.area.name} />
                        <InfoItem icon={Wrench} label="Type" value={workRequest.type} />
                        <InfoItem icon={AlertTriangle} label="Mode" value={workRequest.mode} />
                        {workRequest.runningHour && (
                          <InfoItem icon={Activity} label="Running Hour" value={workRequest.runningHour} />
                        )}
                        {workRequest.referredFromId && (
                          <InfoItem icon={ArrowUpRight} label="Referred From" value={workRequest.referredFromId} />
                        )}
                        {workRequest.referredToId && (
                          <InfoItem icon={ArrowDownRight} label="Referred To" value={workRequest.referredToId} />
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="people" className="mt-0">
                    <Card>
                      <CardContent className="p-6 space-y-6">
                        <EmployeeInfo title="Creator" employee={workRequest.creator} />
                        {workRequest.maintEngr && (
                          <EmployeeInfo title="Maintenance Engineer" employee={workRequest.maintEngr} />
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="timeline" className="mt-0">
                    <Card>
                      <CardContent className="p-6 space-y-4">
                        <TimelineItem icon={Clock} label="Created" value={format(workRequest.createdAt, "PPpp")} />
                        {workRequest.workStartedAt && (
                          <TimelineItem icon={Activity} label="Work Started" value={format(workRequest.workStartedAt, "PPpp")} />
                        )}
                        {workRequest.workFinishConfrimedAt && (
                          <TimelineItem icon={Zap} label="Work Finished" value={format(workRequest.workFinishConfrimedAt, "PPpp")} />
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="remarks" className="mt-0">
                    <Card>
                      <CardContent className="p-6">
                        {workRequest.remarks ? (
                          <p className="text-sm text-gray-700">{workRequest.remarks}</p>
                        ) : (
                          <p className="text-sm text-gray-500 italic">No remarks available.</p>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </ScrollArea>
              </Tabs>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  )
}

function InfoItem({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-blue-100 p-2 rounded-full">
        <Icon className="w-4 h-4 text-blue-500" />
      </div>
      <div>
        <span className="text-sm text-gray-500 block">{label}</span>
        <p className="text-sm font-medium text-gray-700">{value}</p>
      </div>
    </div>
  )
}

function TimelineItem({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="bg-green-100 p-2 rounded-full mt-1">
        <Icon className="w-4 h-4 text-green-500" />
      </div>
      <div>
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <p className="text-xs text-gray-500">{value}</p>
      </div>
    </div>
  )
}

function EmployeeInfo({ title, employee }: { title: string; employee: WorkRequest["creator"] | WorkRequest["maintEngr"] }) {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-12 w-12">
        <AvatarImage src={employee.imageUrl} alt={employee.name} />
        <AvatarFallback><User className="w-6 h-6" /></AvatarFallback>
      </Avatar>
      <div>
        <p className="font-medium text-gray-800">{employee.name}</p>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-sm text-gray-500">{employee.designation}, {employee.department}</p>
      </div>
    </div>
  )
}

