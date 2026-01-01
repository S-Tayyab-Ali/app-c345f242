"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Phone, Globe, ExternalLink, Filter } from 'lucide-react';
import { Button, Card, Badge } from '../../components/ui/components';
import { useApp } from '../../context/AppContext';
import { RESOURCES } from '../../lib/data';

export default function ResourcesPage() {
  const { language, t } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredResources = RESOURCES.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          resource.zipCodes.some(zip => zip.includes(searchTerm));
    const matchesType = selectedType ? resource.type === selectedType : true;
    return matchesSearch && matchesType;
  });

  const resourceTypes = ['Safety', 'Funding', 'Contractor', 'Support'];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            {language === 'en' ? "Trusted Resources" : "Recursos Confiables"}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {language === 'en' 
              ? "Find verified providers and programs in Orange County." 
              : "Encuentre proveedores y programas verificados en el Condado de Orange."}
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder={language === 'en' ? "Search by name or ZIP code..." : "Buscar por nombre o código postal..."}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button 
              variant={selectedType === null ? 'primary' : 'outline'} 
              size="sm"
              onClick={() => setSelectedType(null)}
            >
              {language === 'en' ? "All" : "Todos"}
            </Button>
            {resourceTypes.map(type => (
              <Button
                key={type}
                variant={selectedType === type ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedType(type)}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {filteredResources.length > 0 ? (
            filteredResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
                  <div className="p-6 space-y-4 flex-grow">
                    <div className="flex justify-between items-start">
                      <Badge variant="success" className="bg-teal-50 text-teal-700 border-teal-100">
                        {resource.type}
                      </Badge>
                      {resource.verified && (
                        <Badge variant="outline" className="text-xs">
                          {language === 'en' ? "Verified" : "Verificado"}
                        </Badge>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900">{resource.name}</h3>
                    
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {language === 'en' ? resource.description.en : resource.description.es}
                    </p>

                    <div className="space-y-2 pt-2">
                      {resource.contact.phone && (
                        <div className="flex items-center gap-2 text-sm text-slate-700">
                          <Phone className="w-4 h-4 text-slate-400" />
                          <a href={`tel:${resource.contact.phone}`} className="hover:text-teal-600 transition-colors">
                            {resource.contact.phone}
                          </a>
                        </div>
                      )}
                      {resource.contact.website && (
                        <div className="flex items-center gap-2 text-sm text-slate-700">
                          <Globe className="w-4 h-4 text-slate-400" />
                          <a 
                            href={resource.contact.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-teal-600 transition-colors flex items-center gap-1"
                          >
                            {language === 'en' ? "Visit Website" : "Visitar Sitio Web"}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="px-6 pb-6 pt-0 mt-auto">
                    <div className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {language === 'en' ? "Serves:" : "Sirve:"} {resource.zipCodes.slice(0, 3).join(', ')}...
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-slate-500">
                {language === 'en' ? "No resources found matching your criteria." : "No se encontraron recursos que coincidan con sus criterios."}
              </p>
              <Button variant="ghost" onClick={() => { setSearchTerm(''); setSelectedType(null); }} className="mt-2">
                {language === 'en' ? "Clear Filters" : "Borrar Filtros"}
              </Button>
            </div>
          )}
        </div>

        {/* Suggest Resource CTA */}
        <div className="bg-teal-700 rounded-2xl p-8 text-center text-white">
          <h3 className="text-xl font-bold mb-2">
            {language === 'en' ? "Know a great resource?" : "¿Conoce un buen recurso?"}
          </h3>
          <p className="text-teal-100 mb-6">
            {language === 'en' 
              ? "Help us grow our directory by suggesting a trusted provider." 
              : "Ayúdenos a hacer crecer nuestro directorio sugiriendo un proveedor de confianza."}
          </p>
          <Link href="/suggest">
            <Button variant="secondary" className="bg-white text-teal-800 hover:bg-teal-50 border-none">
              {language === 'en' ? "Suggest a Resource" : "Sugerir un Recurso"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

