import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { LuTrash2 } from "react-icons/lu";
import { FaCheckCircle } from "react-icons/fa";
import { HomeSliderApi } from "../../utils/api";
import toast from "react-hot-toast";
import { IoCloseCircle } from "react-icons/io5";

export function HomeSliderProductTable() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const fetchSlides = async () => {
    setLoading(true);
    try {
      const res = await HomeSliderApi.getAll();
      const slideData = res.data.data || [];
      setSlides(slideData);
      const active = slideData.find((s) => s.isActive);
      setActiveId(active?._id || null);
    } catch (err) {
      toast.error("Failed to fetch slides");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this slide?")) return;
    try {
      await HomeSliderApi.delete(id);
      toast.success("Slide deleted");
      fetchSlides();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const handleSetActive = async (id) => {
    try {
      await HomeSliderApi.setActive(id);
      toast.success("Slide applied to frontend");
      fetchSlides();
    } catch (err) {
      toast.error("Failed to apply slide");
    }
  };

  return (
    <Table className="border rounded-full! mt-5">
      <TableHeader>
        <TableRow>
          <TableHead className="font-roboto text-xl">Images</TableHead>
          <TableHead className="font-roboto text-xl">Applied</TableHead>
          <TableHead className="font-roboto text-xl">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {slides.map((slide) => (
          <TableRow key={slide._id}>
            <TableCell className="font-medium overflow-y-hidden">
              <div className="flex gap-2 ">
                {slide.images &&
                  slide.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt="slide"
                      className="w-40 h-auto object-contain"
                    />
                  ))}
              </div>
            </TableCell>
            <TableCell>
              {slide.isActive ? (
                <Tooltip title="Currently applied" placement="top">
                  <Button disabled className="w-8! h-8! bg-green-500! min-w-8!">
                    <FaCheckCircle className="text-white" />
                  </Button>
                </Tooltip>
              ) : (
                <Tooltip title="Apply to frontend" placement="top">
                  <Button
                    className="w-8! h-8! bg-blue-500! border! border-blue-600! min-w-8! hover:bg-blue-600!"
                    onClick={() => handleSetActive(slide._id)}
                  >
                    <IoCloseCircle className="text-white text-2xl" />
                  </Button>
                </Tooltip>
              )}
            </TableCell>
            <TableCell>
              <Tooltip title="delete" placement="top">
                <Button
                  className="w-8! h-8! bg-gray-200 border! border-gray-300! min-w-8! hover:border-blue-500!"
                  onClick={() => handleDelete(slide._id)}
                >
                  <LuTrash2 className="text-gray-600" />
                </Button>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
