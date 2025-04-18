"use client";
import React, { useState } from "react";
import Page from "../partial/Page";
import TextField from "@/components/form/TextField";
import CustomSelect from "@/components/form/CustomSelect";
import SearchInput from "@/components/form/SearchInput";
import ModDataPicker from "@/components/form/DatePicker";
import FileUpload from "@/components/form/FileUpload";
import TextArea from "@/components/form/TextArea";
import CheckBox from "@/components/form/CheckBox";
import Radio from "@/components/form/Radio";
import { formatDateToYYYYMMDD } from "@/utilities/helper";
import { Button } from "@/components/form/Button";
import { ArrowRightIcon, PlusIcon } from "@heroicons/react/24/outline";
import Pagination from "@/components/Pagination";

export default function Components() {
  const [dateValue, setDateValue] = useState("");
  return (
    <Page title={"Components"}>
      <div className="box-section">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <h2 className="mb-3 text-primary-purple font-28 font-semibold">
              Input field
            </h2>
            <div className="space-y-4 border p-2 rounded-xl">
              <TextField placeholder={"Enter your text"}></TextField>
              <CustomSelect />
              <SearchInput />
              <ModDataPicker
                selected={dateValue}
                onChange={(date) => {
                  setDateValue(formatDateToYYYYMMDD(date));
                }}
                placeholderText="Enter date"
              />
              <FileUpload />
              <TextArea />
              <CheckBox checked readOnly />
              <div className="space-y-2">
                <Radio className="active" label={"Active"} />
                <Radio label={"Inactive"} />
              </div>
            </div>
          </div>
          <div>
            <h2 className="mb-3 text-primary-purple font-28 font-semibold">
              Buttons
            </h2>
            <div className="space-y-4 border p-2 rounded-xl">
              <Button className="w-full">Primary</Button>

              <Button variant="primary" href="/dashboard">
                Primary Link
              </Button>
              <Button variant="primary" disabled>
                Disabled
              </Button>
              <Button variant="danger">Danger</Button>
              <Button variant="stroke">Stroke</Button>
              <Button
                variant="stroke"
                icon={<PlusIcon className="h-4 w-4" />}
              >
                Stroke
              </Button>
              <Button variant="edit">Edit</Button>

              <Button
                variant="ghost"
                icon={<PlusIcon className="h-4 w-4" />}
              >
                Stroke
              </Button>

              <Button variant="stroke" iconPosition="right">
                Stroke
              </Button>
              <Button
                variant="primary"
                rightIcon={<ArrowRightIcon className="h-4 w-4" />}
              >
                Primary
              </Button>
              <Button
                variant="primary"
                icon={<PlusIcon className="h-4 w-4" />}
              >
                Primary
              </Button>
              <Button
                variant="stroke"
                href="https://example.com"
                target="_blank"
              >
                External Link
              </Button>
            </div>
          </div>
          <div>
            <h2 className="mb-3 text-primary-purple font-28 font-semibold">
              Pagination
            </h2>
            <Pagination />
          </div>
        </div>
      </div>
    </Page>
  );
}
