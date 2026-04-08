import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Calendar,
  Wrench,
  CheckCircle,
  AlertCircle,
  Zap,
  Droplets,
  Clock,
  Phone,
  Mail,
  Trash2,
  Plus,
  FileText,
} from "lucide-react";
import { getCurrentUser } from "@/utils/authUtils";

interface Installation {
  id: string;
  type: "solar" | "rtrwh";
  name: string;
  installationDate: string;
  capacity?: string;
  status: "active" | "maintenance-due" | "inactive";
  nextServiceDate: string;
  serviceIntervalMonths: number;
  lastServiceDate?: string;
}

interface ServiceNotification {
  id: string;
  installationId: string;
  type: "maintenance" | "cleaning" | "inspection" | "replacement";
  title: string;
  description: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  read: boolean;
  createdDate: string;
}

export default function ServiceNotifications() {
  const user = getCurrentUser();
  const [installations, setInstallations] = useState<Installation[]>([
    {
      id: "inst1",
      type: "solar",
      name: "Rooftop Solar System - 5kWp",
      installationDate: "2023-06-15",
      capacity: "5 kWp",
      status: "active",
      nextServiceDate: "2024-06-15",
      serviceIntervalMonths: 6,
      lastServiceDate: "2023-12-20",
    },
    {
      id: "inst2",
      type: "rtrwh",
      name: "Rainwater Harvesting System",
      installationDate: "2023-03-10",
      capacity: "50,000L tank",
      status: "maintenance-due",
      nextServiceDate: "2024-03-10",
      serviceIntervalMonths: 12,
      lastServiceDate: "2023-06-05",
    },
  ]);

  const [notifications, setNotifications] = useState<ServiceNotification[]>([
    {
      id: "notif1",
      installationId: "inst1",
      type: "cleaning",
      title: "Solar Panel Cleaning Due",
      description:
        "Your solar panels need regular cleaning to maintain optimal efficiency. Dust and dirt reduce generation by 15-25%.",
      dueDate: "2024-02-15",
      priority: "medium",
      read: false,
      createdDate: "2024-02-10",
    },
    {
      id: "notif2",
      installationId: "inst2",
      type: "inspection",
      title: "RTRWH System Inspection Due",
      description:
        "Annual inspection recommended by Ministry of Jal Shakti for proper functioning.",
      dueDate: "2024-03-10",
      priority: "high",
      read: false,
      createdDate: "2024-03-05",
    },
    {
      id: "notif3",
      installationId: "inst1",
      type: "maintenance",
      title: "Inverter Maintenance Scheduled",
      description:
        "Preventive maintenance for your solar inverter to ensure longevity.",
      dueDate: "2024-04-01",
      priority: "low",
      read: true,
      createdDate: "2024-03-20",
    },
  ]);

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n)),
    );
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50";
      case "medium":
        return "text-amber-600 bg-amber-50";
      case "low":
        return "text-blue-600 bg-blue-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "cleaning":
        return <Wrench className="w-4 h-4" />;
      case "inspection":
        return <CheckCircle className="w-4 h-4" />;
      case "maintenance":
        return <Clock className="w-4 h-4" />;
      case "replacement":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getInstallationType = (type: string) => {
    return type === "solar" ? (
      <Badge className="bg-yellow-100 text-yellow-800">
        <Zap className="w-3 h-3 mr-1" />
        Solar
      </Badge>
    ) : (
      <Badge className="bg-blue-100 text-blue-800">
        <Droplets className="w-3 h-3 mr-1" />
        RTRWH
      </Badge>
    );
  };

  const getDaysUntilService = (dateString: string) => {
    const today = new Date();
    const serviceDate = new Date(dateString);
    const diff = Math.ceil(
      (serviceDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );
    return diff;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Bell className="w-8 h-8 text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900">
            Service & Maintenance
          </h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Track your installations and manage maintenance schedules
        </p>
      </div>

      {/* Notifications Alert */}
      {unreadCount > 0 && (
        <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900">
              {unreadCount} pending notification{unreadCount > 1 ? "s" : ""}
            </h3>
            <p className="text-sm text-blue-700">
              You have unread service reminders below
            </p>
          </div>
        </div>
      )}

      {/* Installations Overview */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Your Installations
          </h2>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Installation
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {installations.map((installation) => {
            const daysUntil = getDaysUntilService(installation.nextServiceDate);
            const isOverdue = daysUntil < 0;

            return (
              <Card key={installation.id} className="border-none shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <CardTitle className="text-lg">
                        {installation.name}
                      </CardTitle>
                      {installation.capacity && (
                        <p className="text-sm text-gray-600 mt-1">
                          Capacity: {installation.capacity}
                        </p>
                      )}
                    </div>
                    {getInstallationType(installation.type)}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Installation Details */}
                  <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">
                        Installation Date
                      </p>
                      <p className="font-semibold text-gray-900">
                        {new Date(
                          installation.installationDate,
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Status</p>
                      <Badge
                        variant={
                          installation.status === "active"
                            ? "default"
                            : "destructive"
                        }
                      >
                        {installation.status === "active"
                          ? "Active"
                          : "Maintenance Due"}
                      </Badge>
                    </div>
                  </div>

                  {/* Service Schedule */}
                  <div
                    className={`p-4 rounded-lg ${
                      isOverdue
                        ? "bg-red-50 border border-red-200"
                        : "bg-green-50 border border-green-200"
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="w-4 h-4" />
                      <p className="font-semibold text-gray-900">
                        {isOverdue ? "Service Overdue" : "Next Service"}
                      </p>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">
                      {new Date(
                        installation.nextServiceDate,
                      ).toLocaleDateString()}
                    </p>
                    <p
                      className={`text-sm font-medium ${
                        isOverdue
                          ? "text-red-700"
                          : daysUntil <= 30
                            ? "text-amber-700"
                            : "text-green-700"
                      }`}
                    >
                      {isOverdue
                        ? `${Math.abs(daysUntil)} days overdue`
                        : `${daysUntil} days remaining`}
                    </p>
                    {installation.lastServiceDate && (
                      <p className="text-xs text-gray-600 mt-2">
                        Last serviced:{" "}
                        {new Date(
                          installation.lastServiceDate,
                        ).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4 border-t border-gray-200">
                    <Button variant="outline" className="flex-1">
                      <Phone className="w-4 h-4 mr-2" />
                      Schedule Service
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <FileText className="w-4 h-4 mr-2" />
                      View Logs
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Service Notifications */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
          <Bell className="w-6 h-6 text-blue-600" />
          <span>Service Notifications</span>
        </h2>

        {notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map((notification) => {
              const installation = installations.find(
                (i) => i.id === notification.installationId,
              );

              return (
                <Card
                  key={notification.id}
                  className={`border-none shadow-lg ${
                    !notification.read
                      ? "border-l-4 border-l-blue-600 bg-blue-50/50"
                      : ""
                  }`}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start space-x-3 mb-3">
                          <div
                            className={`p-3 rounded-lg ${getPriorityColor(
                              notification.priority,
                            )}`}
                          >
                            {getTypeIcon(notification.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-gray-900">
                                {notification.title}
                              </h3>
                              {!notification.read && (
                                <Badge className="bg-red-100 text-red-700">
                                  New
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">
                              For: {installation?.name}
                            </p>
                            <p className="text-sm text-gray-700 mt-2">
                              {notification.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 text-xs text-gray-600 mt-4">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>
                              Due:{" "}
                              {new Date(
                                notification.dueDate,
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <div>
                            <Badge
                              variant={
                                notification.priority === "high"
                                  ? "destructive"
                                  : "secondary"
                              }
                            >
                              {notification.priority.charAt(0).toUpperCase() +
                                notification.priority.slice(1)}{" "}
                              Priority
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        {!notification.read && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Mark Read
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-green-50 rounded-lg border border-green-200">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              All Caught Up!
            </h3>
            <p className="text-green-700">
              No pending service notifications. Your systems are in great shape.
            </p>
          </div>
        )}
      </div>

      {/* Maintenance Tips */}
      <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          <span>Maintenance Tips</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2 flex items-center space-x-2">
              <Zap className="w-4 h-4 text-yellow-600" />
              <span>Solar Panel Care</span>
            </h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Clean panels every 6 months or after heavy dust/rains</li>
              <li>• Check inverter display monthly for error codes</li>
              <li>• Annual professional maintenance is recommended</li>
              <li>• Monitor monthly generation for sudden drops</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2 flex items-center space-x-2">
              <Droplets className="w-4 h-4 text-blue-600" />
              <span>RTRWH System Care</span>
            </h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Clean first-flush divider after every rain</li>
              <li>• Check tank for algae growth in summer</li>
              <li>• Annual inspection of recharge structures</li>
              <li>• Maintain filter beds for optimal infiltration</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
