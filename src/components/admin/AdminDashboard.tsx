"use client";

import { useState, useEffect } from "react";
import { useFirebase } from "@/firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, PlusCircle } from "lucide-react";
import Link from "next/link";

interface OpenHouseDate {
  id: string;
  month: string;
  days: string;
}

export function AdminDashboard() {
  const { firestore } = useFirebase();
  const [month, setMonth] = useState("");
  const [days, setDays] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openHouseDatesCollection = firestore
    ? collection(firestore, "open_house_dates")
    : null;
  const datesQuery = openHouseDatesCollection ? query(openHouseDatesCollection, orderBy("createdAt", "asc")) : null;

  const [value, collectionLoading, collectionError] = useCollection(datesQuery);

  const openHouseDates: OpenHouseDate[] =
    value?.docs.map((doc) => ({
      id: doc.id,
      month: doc.data().month,
      days: doc.data().days,
    })) || [];

  const handleAddDate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firestore || !month || !days) {
      setError("Month and days are required.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await addDoc(collection(firestore, "open_house_dates"), {
        month,
        days,
        createdAt: serverTimestamp(),
      });
      setMonth("");
      setDays("");
    } catch (err) {
      setError("Failed to add date. Please try again.");
      console.error(err);
    }
    setLoading(false);
  };

  const handleDeleteDate = async (id: string) => {
    if (!firestore) return;
    try {
      await deleteDoc(doc(firestore, "open_house_dates", id));
    } catch (err) {
      console.error("Failed to delete date:", err);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-headline font-bold text-primary">
          Admin Dashboard
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Open House Dates</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddDate} className="flex flex-col sm:flex-row gap-4 mb-8">
            <Input
              type="text"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              placeholder="Month (e.g., 'November 2025')"
              className="flex-1"
            />
            <Input
              type="text"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              placeholder="Days (e.g., 'Vrijdag 1 & Zaterdag 2')"
              className="flex-1"
            />
            <Button type="submit" disabled={loading} className="flex items-center gap-2">
              {loading ? "Adding..." : <> <PlusCircle size={16} /> Add Date </>}
            </Button>
          </form>

          {error && <p className="text-destructive mb-4">{error}</p>}
          
          <div className="space-y-4">
            {collectionLoading && <p>Loading dates...</p>}
            {collectionError && <p className="text-destructive">Error loading dates: {collectionError.message}</p>}
            {!collectionLoading && openHouseDates.length === 0 && <p>No open house dates found.</p>}

            {openHouseDates.map((date) => (
              <div
                key={date.id}
                className="flex items-center justify-between p-4 bg-secondary rounded-lg"
              >
                <div>
                  <p className="font-bold">{date.month}</p>
                  <p className="text-muted-foreground">{date.days}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteDate(date.id)}
                >
                  <Trash2 className="h-5 w-5 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
