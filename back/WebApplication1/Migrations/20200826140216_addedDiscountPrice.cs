using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication1.Migrations
{
    public partial class addedDiscountPrice : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DataId",
                table: "Reservations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DateId",
                table: "Reservations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PriceWithDiscount",
                table: "Reservations",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_DataId",
                table: "Reservations",
                column: "DataId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_Dates_DataId",
                table: "Reservations",
                column: "DataId",
                principalTable: "Dates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Dates_DataId",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_DataId",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "DataId",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "DateId",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "PriceWithDiscount",
                table: "Reservations");
        }
    }
}
