// commitlint.config.js
module.exports = {
  rules: {
    "gitlab-task-prefix": [2, "always", ["DEV", "PROD"]],
  },
  plugins: [
    {
      rules: {
        "gitlab-task-prefix": ({ subject }, _, prefixes) => {
          const prefixRegex = (prefix) =>
            new RegExp(`^\\[${prefix}-\\d+\\]\\ [A-Z]`);

          return [
            prefixes.some((prefix) => prefixRegex(prefix).test(subject)),
            `Your subject should respect this form: 
    [<prefix>-<number>] <description>

    <prefix> - ${prefixes.join(" | ")}
    <number> - number
    <description> - string (Capitalize first word)

    Valid example:
    [DEV-1234] Some commit Name HERE
            `,
          ];
        },
      },
    },
  ],
};
