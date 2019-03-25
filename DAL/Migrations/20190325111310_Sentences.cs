using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DAL.Migrations
{
    public partial class Sentences : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte[]>(
                name: "RowVersion",
                table: "WordAnswers",
                rowVersion: true,
                nullable: true,
                oldClrType: typeof(byte[]),
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "SentenceAnswers",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    RowVersion = table.Column<byte[]>(rowVersion: true, nullable: true),
                    Answer = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SentenceAnswers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Sentences",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    RowVersion = table.Column<byte[]>(rowVersion: true, nullable: true),
                    Text = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sentences", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SentenceTasks",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    RowVersion = table.Column<byte[]>(rowVersion: true, nullable: true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SentenceTasks", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SentenceTranslations",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    RowVersion = table.Column<byte[]>(rowVersion: true, nullable: true),
                    Translation = table.Column<string>(nullable: true),
                    SentenceId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SentenceTranslations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SentenceTranslations_Sentences_SentenceId",
                        column: x => x.SentenceId,
                        principalTable: "Sentences",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AssignedSentenceTasks",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    RowVersion = table.Column<byte[]>(rowVersion: true, nullable: true),
                    UserId = table.Column<Guid>(nullable: false),
                    TaskStatus = table.Column<int>(nullable: false),
                    Deadline = table.Column<DateTime>(nullable: false),
                    CompleteDate = table.Column<DateTime>(nullable: true),
                    SentenceTaskId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssignedSentenceTasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AssignedSentenceTasks_SentenceTasks_SentenceTaskId",
                        column: x => x.SentenceTaskId,
                        principalTable: "SentenceTasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AssignedSentenceTasks_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RelSentenceTasks",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    RowVersion = table.Column<byte[]>(rowVersion: true, nullable: true),
                    SentenceId = table.Column<Guid>(nullable: false),
                    TaskId = table.Column<Guid>(nullable: false),
                    Order = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RelSentenceTasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RelSentenceTasks_Sentences_SentenceId",
                        column: x => x.SentenceId,
                        principalTable: "Sentences",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RelSentenceTasks_SentenceTasks_TaskId",
                        column: x => x.TaskId,
                        principalTable: "SentenceTasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RelAnsweredSentences",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    RowVersion = table.Column<byte[]>(rowVersion: true, nullable: true),
                    SentenceAnswerId = table.Column<Guid>(nullable: false),
                    SentenceId = table.Column<Guid>(nullable: false),
                    AssignedSentenceTaskId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RelAnsweredSentences", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RelAnsweredSentences_AssignedSentenceTasks_AssignedSentenceTaskId",
                        column: x => x.AssignedSentenceTaskId,
                        principalTable: "AssignedSentenceTasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RelAnsweredSentences_SentenceAnswers_SentenceAnswerId",
                        column: x => x.SentenceAnswerId,
                        principalTable: "SentenceAnswers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RelAnsweredSentences_Sentences_SentenceId",
                        column: x => x.SentenceId,
                        principalTable: "Sentences",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AssignedSentenceTasks_SentenceTaskId",
                table: "AssignedSentenceTasks",
                column: "SentenceTaskId");

            migrationBuilder.CreateIndex(
                name: "IX_AssignedSentenceTasks_UserId",
                table: "AssignedSentenceTasks",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_RelAnsweredSentences_AssignedSentenceTaskId",
                table: "RelAnsweredSentences",
                column: "AssignedSentenceTaskId");

            migrationBuilder.CreateIndex(
                name: "IX_RelAnsweredSentences_SentenceAnswerId",
                table: "RelAnsweredSentences",
                column: "SentenceAnswerId");

            migrationBuilder.CreateIndex(
                name: "IX_RelAnsweredSentences_SentenceId",
                table: "RelAnsweredSentences",
                column: "SentenceId");

            migrationBuilder.CreateIndex(
                name: "IX_RelSentenceTasks_SentenceId",
                table: "RelSentenceTasks",
                column: "SentenceId");

            migrationBuilder.CreateIndex(
                name: "IX_RelSentenceTasks_TaskId",
                table: "RelSentenceTasks",
                column: "TaskId");

            migrationBuilder.CreateIndex(
                name: "IX_SentenceTranslations_SentenceId",
                table: "SentenceTranslations",
                column: "SentenceId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RelAnsweredSentences");

            migrationBuilder.DropTable(
                name: "RelSentenceTasks");

            migrationBuilder.DropTable(
                name: "SentenceTranslations");

            migrationBuilder.DropTable(
                name: "AssignedSentenceTasks");

            migrationBuilder.DropTable(
                name: "SentenceAnswers");

            migrationBuilder.DropTable(
                name: "Sentences");

            migrationBuilder.DropTable(
                name: "SentenceTasks");

            migrationBuilder.AlterColumn<byte[]>(
                name: "RowVersion",
                table: "WordAnswers",
                nullable: true,
                oldClrType: typeof(byte[]),
                oldRowVersion: true,
                oldNullable: true);
        }
    }
}
