using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication1.Migrations
{
    public partial class mrnjau : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dates_Cars_CarId1",
                table: "Dates");

            migrationBuilder.DropIndex(
                name: "IX_Dates_CarId1",
                table: "Dates");

            migrationBuilder.DropColumn(
                name: "CarId1",
                table: "Dates");

            migrationBuilder.AddColumn<int>(
                name: "IdOfCar",
                table: "Dates",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "MyCarIdId",
                table: "Dates",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Dates_MyCarIdId",
                table: "Dates",
                column: "MyCarIdId");

            migrationBuilder.AddForeignKey(
                name: "FK_Dates_Cars_MyCarIdId",
                table: "Dates",
                column: "MyCarIdId",
                principalTable: "Cars",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dates_Cars_MyCarIdId",
                table: "Dates");

            migrationBuilder.DropIndex(
                name: "IX_Dates_MyCarIdId",
                table: "Dates");

            migrationBuilder.DropColumn(
                name: "IdOfCar",
                table: "Dates");

            migrationBuilder.DropColumn(
                name: "MyCarIdId",
                table: "Dates");

            migrationBuilder.AddColumn<int>(
                name: "CarId1",
                table: "Dates",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Dates_CarId1",
                table: "Dates",
                column: "CarId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Dates_Cars_CarId1",
                table: "Dates",
                column: "CarId1",
                principalTable: "Cars",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
