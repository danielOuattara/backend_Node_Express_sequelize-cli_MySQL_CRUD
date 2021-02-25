'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('users', [
      {
       name: 'Antony Banderas',
       email: 'antBand@email.com',
       role: 'admin',
       uuid: 'b43c22f6-5616-4c7f-e6b1-1cfe134f7dc1',
       createdAt:'2021-02-25T02:46:36.000',
       updatedAt:'2021-02-25T02:46:36.000'
       
     },

      {
       name: 'Mike Tyson',
       email: 'mkTy@email.com',
       role: 'SuperAdmin',
       uuid: '1f678-3a343-2353b-653eb3725de',
       createdAt:'2021-02-25T02:46:36.000',
       updatedAt:'2021-02-25T02:46:36.000'
       
     },

      {
       name: 'Pere Noël',
       email: 'kake@email.com',
       role: 'SuperDreamer',
       uuid: '7777ef3a-7d26-4e38-8569-501be6cdc3f9',
       createdAt:'1930-12-25T02:46:36.000',
       updatedAt:'1930-12-25T02:46:36.000'
       
     },
    
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

     await queryInterface.bulkDelete('users', null, {});
  }
};
