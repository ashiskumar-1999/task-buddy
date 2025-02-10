import React, { FormEvent, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FormProps } from '@/types';

type DialogProps = {
  isDialogOpen: boolean;
  onDialogClose: () => void;
  onSubmit: (formData: FormProps) => void;
};

const Createtask = ({ isDialogOpen, onDialogClose, onSubmit }: DialogProps) => {
  const [formData, setFormData] = useState<FormProps>({
    title: '',
    description: '',
    category: '',
    dueDate: new Date(),
    status: '',
    uploadFile: null,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target;

    if (id === 'uploadFile' && e.target instanceof HTMLInputElement) {
      const files = e.target.files;
      if (files && files.length > 0) {
        setFormData((prevData) => ({
          ...prevData,
          [id]: files[0],
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const onInputSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onDialogClose();
    setFormData({
      title: '',
      description: '',
      category: '',
      dueDate: new Date(),
      status: '',
      uploadFile: null,
    });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={onDialogClose}>
      <DialogContent className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Create Task
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={onInputSubmit}>
          <div className="space-y-4">
            {/* Task Title Input */}
            <Label
              htmlFor="task-title"
              className="block text-sm font-medium text-gray-700"
            >
              Task Title
            </Label>
            <Input
              id="title"
              placeholder="Enter task title"
              className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
              value={formData.title}
              onChange={handleChange}
            />
            <Label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Enter task description"
              rows={3}
              className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
              value={formData.description}
              onChange={handleChange}
            />
            <Label className="block text-sm font-medium text-gray-700">
              Task Category
            </Label>
            <div className="flex items-center space-x-4 mt-1">
              <Button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
                Work
              </Button>
              <Button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300">
                Personal
              </Button>
            </div>
          </div>

          {/* Due Date and Status */}
          <div className="flex gap-14 py-4">
            <div>
              <Label
                htmlFor="due-date"
                className="block text-sm font-medium text-gray-700"
              >
                Due on*
              </Label>
              <Input
                type="date"
                id="dueDate"
                className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label
                htmlFor="task-status"
                className="block text-sm font-medium text-gray-700"
              >
                Task Status*
              </Label>
              <select
                id="status"
                onChange={handleChange}
                className="mt-1 w-28 h-9 border border-gray-300 rounded-md shadow-sm focus:ring-purple-100 focus:border-purple-100"
                required
              >
                <option value="">Choose</option>
                <option value="to-do">To-Do</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          <Label className="block text-sm font-medium text-gray-700">
            Attachment
          </Label>
          <div className="h-14 mt-2 border border-dashed border-gray-300 rounded-md text-center text-sm text-gray-500">
            <Input
              id="uploadFile"
              type="file"
              onChange={handleChange}
              className="h-full w-full"
            />
          </div>

          {/* Footer Buttons */}
          <DialogFooter className="mt-6 flex justify-end space-x-4">
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                className="bg-gray-200 text-gray-700"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="bg-[#7B1984] text-white">
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Createtask;
