using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DAL.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    RowVersion = table.Column<byte[]>(rowVersion: true, nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true),
                    UserType = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "VerbAnswers",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    RowVersion = table.Column<byte[]>(rowVersion: true, nullable: true),
                    Answer = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VerbAnswers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Verbs",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    RowVersion = table.Column<byte[]>(rowVersion: true, nullable: true),
                    CommonWord = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Verbs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "VerbTasks",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    RowVersion = table.Column<byte[]>(rowVersion: true, nullable: true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VerbTasks", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "WordAnswers",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    RowVersion = table.Column<byte[]>(nullable: true),
                    Answer = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WordAnswers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Words",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    RowVersion = table.Column<byte[]>(rowVersion: true, nullable: true),
                    Word = table.Column<string>(nullable: true),
                    Transcription = table.Column<string>(nullable: true),
                    Translation = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Words", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "WordTasks",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    RowVersion = table.Column<byte[]>(rowVersion: true, nullable: true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WordTasks", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AssignedVerbTasks",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    RowVersion = table.Column<byte[]>(rowVersion: true, nullable: true),
                    UserId = table.Column<Guid>(nullable: false),
                    TaskStatus = table.Column<int>(nullable: false),
                    Deadline = table.Column<DateTime>(nullable: false),
                    CompleteDate = table.Column<DateTime>(nullable: true),
                    VerbTaskId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssignedVerbTasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AssignedVerbTasks_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AssignedVerbTasks_VerbTasks_VerbTaskId",
                        column: x => x.VerbTaskId,
                        principalTable: "VerbTasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RelVerbTasks",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    RowVersion = table.Column<byte[]>(rowVersion: true, nullable: true),
                    VerbTaskId = table.Column<Guid>(nullable: false),
                    VerbId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RelVerbTasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RelVerbTasks_Verbs_VerbId",
                        column: x => x.VerbId,
                        principalTable: "Verbs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RelVerbTasks_VerbTasks_VerbTaskId",
                        column: x => x.VerbTaskId,
                        principalTable: "VerbTasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RelWordVerbs",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    RowVersion = table.Column<byte[]>(rowVersion: true, nullable: true),
                    WordId = table.Column<Guid>(nullable: false),
                    VerbId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RelWordVerbs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RelWordVerbs_Verbs_VerbId",
                        column: x => x.VerbId,
                        principalTable: "Verbs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RelWordVerbs_Words_WordId",
                        column: x => x.WordId,
                        principalTable: "Words",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AssignedWordTasks",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    RowVersion = table.Column<byte[]>(rowVersion: true, nullable: true),
                    UserId = table.Column<Guid>(nullable: false),
                    TaskStatus = table.Column<int>(nullable: false),
                    Deadline = table.Column<DateTime>(nullable: false),
                    CompleteDate = table.Column<DateTime>(nullable: true),
                    WordTaskId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssignedWordTasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AssignedWordTasks_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AssignedWordTasks_WordTasks_WordTaskId",
                        column: x => x.WordTaskId,
                        principalTable: "WordTasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RelWordTasks",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    RowVersion = table.Column<byte[]>(rowVersion: true, nullable: true),
                    TaskId = table.Column<Guid>(nullable: false),
                    WordId = table.Column<Guid>(nullable: false),
                    IsTranslation = table.Column<bool>(nullable: false),
                    Order = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RelWordTasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RelWordTasks_WordTasks_TaskId",
                        column: x => x.TaskId,
                        principalTable: "WordTasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RelWordTasks_Words_WordId",
                        column: x => x.WordId,
                        principalTable: "Words",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RelAnswerVerb",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    RowVersion = table.Column<byte[]>(rowVersion: true, nullable: true),
                    AnswerId = table.Column<Guid>(nullable: false),
                    VerbId = table.Column<Guid>(nullable: false),
                    AssignedVerbTaskId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RelAnswerVerb", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RelAnswerVerb_VerbAnswers_AnswerId",
                        column: x => x.AnswerId,
                        principalTable: "VerbAnswers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RelAnswerVerb_AssignedVerbTasks_AssignedVerbTaskId",
                        column: x => x.AssignedVerbTaskId,
                        principalTable: "AssignedVerbTasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RelAnswerVerb_Verbs_VerbId",
                        column: x => x.VerbId,
                        principalTable: "Verbs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RelAnsweredWords",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    RowVersion = table.Column<byte[]>(rowVersion: true, nullable: true),
                    AssignedTaskId = table.Column<Guid>(nullable: false),
                    WordId = table.Column<Guid>(nullable: false),
                    AnswerId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RelAnsweredWords", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RelAnsweredWords_WordAnswers_AnswerId",
                        column: x => x.AnswerId,
                        principalTable: "WordAnswers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RelAnsweredWords_AssignedWordTasks_AssignedTaskId",
                        column: x => x.AssignedTaskId,
                        principalTable: "AssignedWordTasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RelAnsweredWords_Words_WordId",
                        column: x => x.WordId,
                        principalTable: "Words",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AssignedVerbTasks_UserId",
                table: "AssignedVerbTasks",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AssignedVerbTasks_VerbTaskId",
                table: "AssignedVerbTasks",
                column: "VerbTaskId");

            migrationBuilder.CreateIndex(
                name: "IX_AssignedWordTasks_UserId",
                table: "AssignedWordTasks",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AssignedWordTasks_WordTaskId",
                table: "AssignedWordTasks",
                column: "WordTaskId");

            migrationBuilder.CreateIndex(
                name: "IX_RelAnsweredWords_AnswerId",
                table: "RelAnsweredWords",
                column: "AnswerId");

            migrationBuilder.CreateIndex(
                name: "IX_RelAnsweredWords_AssignedTaskId",
                table: "RelAnsweredWords",
                column: "AssignedTaskId");

            migrationBuilder.CreateIndex(
                name: "IX_RelAnsweredWords_WordId",
                table: "RelAnsweredWords",
                column: "WordId");

            migrationBuilder.CreateIndex(
                name: "IX_RelAnswerVerb_AnswerId",
                table: "RelAnswerVerb",
                column: "AnswerId");

            migrationBuilder.CreateIndex(
                name: "IX_RelAnswerVerb_AssignedVerbTaskId",
                table: "RelAnswerVerb",
                column: "AssignedVerbTaskId");

            migrationBuilder.CreateIndex(
                name: "IX_RelAnswerVerb_VerbId",
                table: "RelAnswerVerb",
                column: "VerbId");

            migrationBuilder.CreateIndex(
                name: "IX_RelVerbTasks_VerbId",
                table: "RelVerbTasks",
                column: "VerbId");

            migrationBuilder.CreateIndex(
                name: "IX_RelVerbTasks_VerbTaskId",
                table: "RelVerbTasks",
                column: "VerbTaskId");

            migrationBuilder.CreateIndex(
                name: "IX_RelWordTasks_TaskId",
                table: "RelWordTasks",
                column: "TaskId");

            migrationBuilder.CreateIndex(
                name: "IX_RelWordTasks_WordId",
                table: "RelWordTasks",
                column: "WordId");

            migrationBuilder.CreateIndex(
                name: "IX_RelWordVerbs_VerbId",
                table: "RelWordVerbs",
                column: "VerbId");

            migrationBuilder.CreateIndex(
                name: "IX_RelWordVerbs_WordId",
                table: "RelWordVerbs",
                column: "WordId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RelAnsweredWords");

            migrationBuilder.DropTable(
                name: "RelAnswerVerb");

            migrationBuilder.DropTable(
                name: "RelVerbTasks");

            migrationBuilder.DropTable(
                name: "RelWordTasks");

            migrationBuilder.DropTable(
                name: "RelWordVerbs");

            migrationBuilder.DropTable(
                name: "WordAnswers");

            migrationBuilder.DropTable(
                name: "AssignedWordTasks");

            migrationBuilder.DropTable(
                name: "VerbAnswers");

            migrationBuilder.DropTable(
                name: "AssignedVerbTasks");

            migrationBuilder.DropTable(
                name: "Verbs");

            migrationBuilder.DropTable(
                name: "Words");

            migrationBuilder.DropTable(
                name: "WordTasks");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "VerbTasks");
        }
    }
}
