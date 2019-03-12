using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DAL.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Answers",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    RowVersion = table.Column<byte[]>(rowVersion: true, nullable: true),
                    Answer = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Answers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "IrregularVerbs",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    RowVersion = table.Column<byte[]>(rowVersion: true, nullable: true),
                    CommonWord = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IrregularVerbs", x => x.Id);
                });

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
                    RowVersion = table.Column<byte[]>(rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WordTasks", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "WordVerbs",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    RowVersion = table.Column<byte[]>(rowVersion: true, nullable: true),
                    WordId = table.Column<Guid>(nullable: false),
                    VerbId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WordVerbs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WordVerbs_IrregularVerbs_VerbId",
                        column: x => x.VerbId,
                        principalTable: "IrregularVerbs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WordVerbs_Words_WordId",
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
                    WordTaskId = table.Column<Guid>(nullable: false),
                    TaskStatus = table.Column<int>(nullable: false),
                    Deadline = table.Column<DateTime>(nullable: false)
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
                name: "TaskWords",
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
                    table.PrimaryKey("PK_TaskWords", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TaskWords_WordTasks_TaskId",
                        column: x => x.TaskId,
                        principalTable: "WordTasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TaskWords_Words_WordId",
                        column: x => x.WordId,
                        principalTable: "Words",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AnsweredWords",
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
                    table.PrimaryKey("PK_AnsweredWords", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AnsweredWords_Answers_AnswerId",
                        column: x => x.AnswerId,
                        principalTable: "Answers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AnsweredWords_AssignedWordTasks_AssignedTaskId",
                        column: x => x.AssignedTaskId,
                        principalTable: "AssignedWordTasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AnsweredWords_Words_WordId",
                        column: x => x.WordId,
                        principalTable: "Words",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AnsweredWords_AnswerId",
                table: "AnsweredWords",
                column: "AnswerId");

            migrationBuilder.CreateIndex(
                name: "IX_AnsweredWords_AssignedTaskId",
                table: "AnsweredWords",
                column: "AssignedTaskId");

            migrationBuilder.CreateIndex(
                name: "IX_AnsweredWords_WordId",
                table: "AnsweredWords",
                column: "WordId");

            migrationBuilder.CreateIndex(
                name: "IX_AssignedWordTasks_UserId",
                table: "AssignedWordTasks",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AssignedWordTasks_WordTaskId",
                table: "AssignedWordTasks",
                column: "WordTaskId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskWords_TaskId",
                table: "TaskWords",
                column: "TaskId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskWords_WordId",
                table: "TaskWords",
                column: "WordId");

            migrationBuilder.CreateIndex(
                name: "IX_WordVerbs_VerbId",
                table: "WordVerbs",
                column: "VerbId");

            migrationBuilder.CreateIndex(
                name: "IX_WordVerbs_WordId",
                table: "WordVerbs",
                column: "WordId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AnsweredWords");

            migrationBuilder.DropTable(
                name: "TaskWords");

            migrationBuilder.DropTable(
                name: "WordVerbs");

            migrationBuilder.DropTable(
                name: "Answers");

            migrationBuilder.DropTable(
                name: "AssignedWordTasks");

            migrationBuilder.DropTable(
                name: "IrregularVerbs");

            migrationBuilder.DropTable(
                name: "Words");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "WordTasks");
        }
    }
}
