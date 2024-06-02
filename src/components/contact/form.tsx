import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Resend } from "resend";
import { z } from "zod";

const ContactForm = () => {
  const form = useForm({
    defaultValues: {
      topic: "select",
      name: "",
      email: "",
      message: "",
    },
    onSubmit: async (values) => {
      const result = await fetch("/api/emails/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values.value),
      });

      if (result.ok) {
        alert("Message sent successfully!");
      } else {
        alert("An error occurred while sending the message");
      }
    },
    validatorAdapter: zodValidator,
  });

  return (
    <form
      className="flex flex-col gap-y-4 max-w-prose w-full mx-auto"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.Field
        name="topic"
        validators={{
          onSubmit: ({ value }) => {
            if (value === "select") {
              return "Select a topic";
            }
          },
        }}
        children={(field) => (
          <label className="form-control">
            <span className="label capitalize">{field.name}</span>

            <select
              className="select border-default"
              name={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            >
              <option disabled value="select">
                Select a topic
              </option>
              <option value="general">General</option>
              <option value="job-offer">Job Offer</option>
              <option value="comission">Commission</option>
              <option value="other">Other</option>
            </select>

            {field.state.meta.errors && (
              <span className="text-error mt-2 font-semibold">
                {field.state.meta.errors[0]}
              </span>
            )}
          </label>
        )}
      />

      <div className="flex flex-col gap-y-4 md:flex-row gap-x-4 w-full">
        <form.Field
          name="name"
          validators={{
            onBlur: z.string().min(1, "Name is required"),
          }}
          children={(field) => (
            <label className="form-control w-full">
              <span className="label capitalize">{field.name}</span>
              <input
                className="input border-default"
                type="text"
                placeholder="Your Name"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors && (
                <span className="text-error mt-2 font-semibold">
                  {field.state.meta.errors[0]}
                </span>
              )}
            </label>
          )}
        />
        <form.Field
          name="email"
          validators={{
            onBlur: z
              .string()
              .min(1, "Email is required")
              .email("Invalid email"),
          }}
          children={(field) => (
            <label className="form-control w-full">
              <span className="label capitalize">{field.name}</span>
              <input
                className="input border-default"
                type="email"
                placeholder="Email"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors && (
                <div className="mt-2 flex flex-col gap-y-1">
                  {field.state.meta.errors
                    .join(", ")
                    .split(", ")
                    .map((err, index) => (
                      <span key={index} className="text-error font-semibold">
                        {err}
                      </span>
                    ))}
                </div>
              )}
            </label>
          )}
        />
      </div>

      <form.Field
        name="message"
        validators={{
          onBlur: z
            .string()
            .min(1, "Message is required")
            .min(64, "Message is too short"),
        }}
        children={(field) => (
          <label className="form-control">
            <span className="label capitalize">{field.name}</span>

            <textarea
              className="textarea border-default min-h-48"
              placeholder="Message"
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />

            {field.state.meta.errors && (
              <div className="mt-2 flex flex-col gap-y-1">
                {field.state.meta.errors
                  .join(", ")
                  .split(", ")
                  .map((err, index) => (
                    <span key={index} className="text-error font-semibold">
                      {err}
                    </span>
                  ))}
              </div>
            )}
          </label>
        )}
      />

      <button className="btn btn-neutral mt-2" type="submit">
        Send
      </button>
    </form>
  );
};

export default ContactForm;